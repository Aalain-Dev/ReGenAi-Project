const Groq = require("groq-sdk");
const { z } = require("zod");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number().int().min(0).max(100),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  title: z.string(),
});

const TRANSIENT_STATUSES = new Set([429, 500, 502, 503, 504]);

function isTransientError(err) {
  const status = err?.status ?? err?.code ?? err?.response?.status;

  if (TRANSIENT_STATUSES.has(Number(status))) {
    return true;
  }

  const msg = String(err?.message || "");

  return /rate.?limit|overloaded|temporar|unavailable/i.test(msg);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MODEL_FALLBACK_CHAIN = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
];

async function callGroqWithRetry(
  messages,
  { maxAttempts = 3, baseDelayMs = 1000, models = MODEL_FALLBACK_CHAIN } = {},
) {
  let lastErr;

  for (const model of models) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await groq.chat.completions.create({
          model,
          messages,
          temperature: 0.3,
          response_format: {
            type: "json_object",
          },
        });
      } catch (err) {
        lastErr = err;

        const transient = isTransientError(err);

        if (!transient) {
          throw err;
        }

        if (attempt === maxAttempts) {
          break;
        }

        const backoff = baseDelayMs * 2 ** (attempt - 1);
        const jitter = Math.floor(Math.random() * 250);

        await sleep(backoff + jitter);
      }
    }
  }

  const overload = new Error(
    "Groq service is overloaded. Please try again later.",
  );

  overload.status = 503;
  overload.cause = lastErr;

  throw overload;
}

async function generateInterviewReportGroq({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON in the following format.
"matchScore" MUST be an integer from 0 to 100 representing the percentage
match between the candidate and the job (e.g. 85 means an 85% match).
Do NOT use a 0-1 or 0-10 scale.

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low|medium|high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": [""]
    }
  ],
  "title": ""
}
`;

  const response = await callGroqWithRetry([
    {
      role: "system",
      content:
        "You are an expert technical interviewer and career coach. Return only valid JSON.",
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from Groq");
  }

  try {
    const parsed = JSON.parse(content);

    return interviewReportSchema.parse(parsed);
  } catch (err) {
    throw new Error(`Groq returned invalid output: ${err.message}`);
  }
}

module.exports = generateInterviewReportGroq;
