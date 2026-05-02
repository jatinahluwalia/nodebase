import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const executeAI = inngest.createFunction(
  { id: "execute-ai", triggers: { event: "execute/ai" } },
  async ({ step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-steps",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistance",
        prompt: "Hehe",
      },
    );
    const { steps: openaiSteps } = await step.ai.wrap(
      "gemini-generate-steps",
      generateText,
      {
        model: openai("gpt-4.1"),
        system: "You are a helpful assistance",
        prompt: "Hehe",
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "gemini-generate-steps",
      generateText,
      {
        model: anthropic("claude-sonnet-4-6"),
        system: "You are a helpful assistance",
        prompt: "Hehe",
      },
    );

    return { geminiSteps, anthropicSteps, openaiSteps };
  },
);
