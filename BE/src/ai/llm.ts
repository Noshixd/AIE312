// ============================================================================
// ⚠️ ไฟล์ชั่วคราว (stub) — สมาชิกคนที่ 3 (AI Engineer) จะส่งไฟล์จริงมาแทนที่
// BE ต้องการแค่ "สัญญา" ด้านล่างนี้ (ชื่อฟังก์ชัน + รูปแบบข้อมูล) ห้ามเปลี่ยนชื่อ
// ตอนนี้ยังไม่ต่อ AI จริง: isLlmConfigured() คืน false → BE ใช้คำตอบจาก fallback.ts
// ============================================================================

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
  return false;
}

export const askLlm: LlmFn = async () => {
  throw new LlmError("ยังไม่ได้เชื่อมต่อ AI (รอไฟล์จากสมาชิกคนที่ 3)");
};
