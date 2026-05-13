import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

interface GenerateSummaryInput {
  title: string;
  content: string;
}

export async function generateSummary(
  input: GenerateSummaryInput,
): Promise<string> {
  const prompt = `
You are an expert compensation analyst.

Summarize this employee review in 2 concise sentences.

TITLE:
${input.title}

CONTENT:
${input.content}
`;

  const response = await client.chat.completions.create({
    model: "grok-3-mini",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
  });

  return (
    response.choices[0]?.message?.content ??
    "No summary generated."
  );
}