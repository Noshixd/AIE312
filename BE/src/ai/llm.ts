export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

// รับ system prompt + บทสนทนา แล้วคืนคำตอบของ AI
export type LlmFn = (system: string, turns: ChatTurn[]) => Promise<string>;

// error จากการเรียก AI — status 429 = โควตาเต็ม, อื่น ๆ = เรียกไม่สำเร็จ (BE แปลงเป็น HTTP 429 / 502)
export class LlmError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

export function isLlmConfigured(): boolean {
  const key = process.env.LLM_API_KEY;
  return Boolean(key && key.trim() !== "");
}

export const askLlm: LlmFn = async (system: string, turns: ChatTurn[]) => {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/";
  const model = process.env.LLM_MODEL || "gemini-3.5-flash-lite";

  if (!apiKey) {
    throw new LlmError("ยังไม่ได้ตั้งค่า LLM_API_KEY", 500);
  }

  try {
    // จัดรูปแบบข้อความให้เข้ากับ OpenAI Chat Completions API
    const messages = [
      { role: "system", content: system },
      ...turns.map((t) => ({ role: t.role, content: t.content })),
    ];

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 429) {
        throw new LlmError("โควตาการใช้งาน AI เต็มชั่วคราว กรุณาลองใหม่อีกครั้ง", 429);
      }
      throw new LlmError(`LLM Error: ${errorText}`, 502);
    }

    const data = (await response.json()) as any;
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new LlmError("AI ไม่ส่งข้อความตอบกลับ", 502);
    }

    return text;
  } catch (err: any) {
    if (err instanceof LlmError) throw err;
    console.error("LLM Error:", err);
    throw new LlmError(err?.message || "ไม่สามารถติดต่อบริการ AI ได้", 502);
  }
};