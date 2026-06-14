export const FORCE_MOCK = process.env.NEXT_PUBLIC_FORCE_MOCK_MODE === "true";
export const HAS_OPENAI = !!process.env.OPENAI_API_KEY && !FORCE_MOCK;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function callOpenAIJson<T>(messages: ChatMessage[]): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("no api key");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        response_format: { type: "json_object" },
        messages,
      }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`openai ${res.status}`);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("empty response");
    return JSON.parse(content) as T;
  } finally {
    clearTimeout(timeout);
  }
}
