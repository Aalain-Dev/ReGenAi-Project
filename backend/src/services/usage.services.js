const InterviewReport = require("../models/interview.model");

const checkGeneration = async (userId) => {
  // Fall back to a sane default so a missing/invalid env var doesn't make
  // MAX_REPORTS NaN, which would block every user.
  const MAX_REPORTS = Number(process.env.ALLOWED_REPORTS_PER_DAY) || 3;

  const now = new Date();
  const windowStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const reportCount = await InterviewReport.countDocuments({
    user: userId,
    createdAt: {
      $gte: windowStart,
    },
  });

  return {
    allowed: reportCount < MAX_REPORTS,
    reportCount,    
    remaining: Math.max(0, MAX_REPORTS - reportCount),
  };
};

module.exports = { checkGeneration };