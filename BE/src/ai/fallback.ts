// ============================================================================
// ⚠️ ไฟล์ชั่วคราว (stub) — สมาชิกคนที่ 3 (AI Engineer) จะส่งไฟล์จริงมาแทนที่
// สัญญา: offlineReply(ข้อความ, portfolio) คืนคำตอบตอนที่ยังไม่มี LLM_API_KEY
// ============================================================================
import type { Portfolio } from "../portfolio/repository";

export function offlineReply(_message: string, p: Portfolio | null): string {
  return `(ยังไม่ได้เชื่อมต่อ AI) ${p ? `กลุ่ม ${p.group.name} มีสมาชิก ${p.members.length} คน` : ""}`.trim();
}
