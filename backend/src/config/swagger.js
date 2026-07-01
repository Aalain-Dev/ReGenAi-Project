// OpenAPI / Swagger configuration.
//
// We use swagger-jsdoc to build the spec from JSDoc @openapi comments that live
// next to the route definitions, plus the shared components (schemas, auth)
// declared here. The spec is served as interactive docs via swagger-ui-express
// (see app.js).
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "ReGenAi API",
      version: "1.0.0",
      description:
        "Interview report generation and authentication APIs for ReGenAi.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
      {
        url: process.env.BACKEND_DEPLOYED_URL,
        description: "Deployed (production) server",
      },
    ],
    tags: [
      { name: "Auth", description: "Registration, login and session" },
      { name: "Reports", description: "Interview report generation" },
    ],
    components: {
      // Auth is a JWT stored in an httpOnly `token` cookie set on login/register.
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        Message: {
          type: "object",
          properties: {
            message: { type: "string", example: "Operation successful" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal server error" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string", example: "janedoe" },
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
            password: {
              type: "string",
              format: "password",
              minLength: 8,
              example: "supersecret",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "supersecret",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            user_id: { type: "string", example: "665f1b2c3d4e5f6a7b8c9d0e" },
            username: { type: "string", example: "janedoe" },
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
          },
        },
        TechnicalQuestion: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
            intention: { type: "string" },
          },
        },
        BehavioralQuestion: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
            intention: { type: "string" },
          },
        },
        SkillGap: {
          type: "object",
          properties: {
            skill: { type: "string" },
            severity: {
              type: "string",
              enum: ["high", "medium", "low"],
            },
          },
        },
        PreparationPlan: {
          type: "object",
          properties: {
            day: { type: "integer", example: 1 },
            focus: { type: "string" },
            tasks: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
        InterviewReport: {
          type: "object",
          properties: {
            _id: { type: "string", example: "665f1b2c3d4e5f6a7b8c9d0e" },
            title: { type: "string" },
            jobDescription: { type: "string" },
            selfDescription: { type: "string" },
            resume: { type: "string" },
            matchScore: { type: "integer", minimum: 0, maximum: 100 },
            preparationPlan: {
              type: "array",
              items: { $ref: "#/components/schemas/PreparationPlan" },
            },
            skillGaps: {
              type: "array",
              items: { $ref: "#/components/schemas/SkillGap" },
            },
            behavioralQuestions: {
              type: "array",
              items: { $ref: "#/components/schemas/BehavioralQuestion" },
            },
            technicalQuestions: {
              type: "array",
              items: { $ref: "#/components/schemas/TechnicalQuestion" },
            },
            user: { type: "string", example: "665f1b2c3d4e5f6a7b8c9d0e" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  // Scan the route files for @openapi JSDoc blocks. Use forward slashes so the
  // glob works on Windows too (path.join would produce backslashes).
  apis: [path.posix.join(__dirname.replace(/\\/g, "/"), "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
