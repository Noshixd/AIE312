import OpenAI from "openai";
import { config } from "../config";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

// ฟังก์ชันที่รับ system prompt + บทสนทนา แล้วคืนคำตอบ (แยกเป็น type เพื่อสลับเป็นตัวปลอมตอนทดสอบได้)
export type LlmFn = (system: string, turns: ChatTurn[]) => Promise<string>;

export class LlmError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

let client: OpenAI | null = null;

export function isLlmConfigured(): boolean {
  return Boolean(config.llm.apiKey);
}

function getClient(): OpenAI {
  if (!client) {
    // ใช้ OpenAI SDK แต่ชี้ไปที่ endpoint แบบ OpenAI-compatible ของ Gemini (หรือเจ้าอื่นก็ได้)
    client = new OpenAI({
      apiKey: config.llm.apiKey,
      baseURL: config.llm.baseUrl,
      // FE ของ Week 11 รอคำตอบแชตแค่ 30 วินาที → ต้องตอบ (หรือ error) ให้ทันก่อนนั้น
      // ถ้า retry อีกรอบจะเกิน 30 วินาที FE ขึ้น error แต่ BE ยังบันทึกคำตอบทีหลัง ผู้ใช้จะงง
      timeout: config.llm.timeoutMs,
      maxRetries: 0,
    });
  }
  return client;
}

export const askLlm: LlmFn = async (system, turns) => {
  try {
    const completion = await getClient().chat.completions.create({
      model: config.llm.model,
      messages: [{ role: "system", content: system }, ...turns],
      temperature: 0.4,
    });
    return completion.choices[0]?.message?.content?.trim() || "(โมเดลไม่ได้ส่งคำตอบกลับมา)";
  } catch (err) {
    const e = err as { status?: number; message?: string };
    throw new LlmError(e.message || "LLM request failed", e.status);
  }
};
