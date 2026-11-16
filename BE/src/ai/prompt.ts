import type { Portfolio } from "../portfolio/repository";

export function buildSystemPrompt(p: Portfolio | null): string {
  // กรณีที่ใน Database ยังไม่มีข้อมูล Portfolio
  if (!p) {
    return `
คุณคือผู้ช่วย AI ประจำเว็บไซต์ Portfolio ของกลุ่ม
ขณะนี้ยังไม่มีข้อมูล Portfolio ของกลุ่มในระบบ หากผู้เยี่ยมชมถามเกี่ยวกับข้อมูลกลุ่มหรือสมาชิก ให้แจ้งอย่างสุภาพว่า "ขณะนี้กำลังอัปเดตข้อมูล Portfolio ของกลุ่มครับ" ห้ามแต่งเรื่องหรือเดาข้อมูลเองเด็ดขาด
`.trim();
  }

  // แปลงข้อมูลสมาชิกทุกคนในกลุ่มให้เป็นข้อความที่ AI อ่านเข้าใจง่าย
  const membersText = p.members && p.members.length > 0
    ? p.members
        .map((m: any, index: number) => {
          const skills = Array.isArray(m.skills) ? m.skills.join(", ") : m.skills || "-";
          const projects = Array.isArray(m.projects)
            ? m.projects.map((proj: any) => (typeof proj === "string" ? proj : `${proj.title || proj.name}: ${proj.description || ""}`)).join("; ")
            : m.projects || "-";

          return `
${index + 1}. ชื่อ: ${m.name || "-"}
   บทบาทในทีม: ${m.role || "-"}
   ทักษะ (Skills): ${skills}
   ผลงาน/โปรเจกต์: ${projects}
   ${m.contact ? `ช่องทางติดต่อ: ${m.contact}` : ""}`.trim();
        })
        .join("\n\n")
    : "ยังไม่มีข้อมูลสมาชิกในระบบ";

  // แปลงข้อมูลผลงานรวมของกลุ่ม (ถ้ามี)
  const groupProjectsText = (p as any).projects && Array.isArray((p as any).projects)
    ? (p as any).projects.map((proj: any) => (typeof proj === "string" ? proj : `${proj.title || proj.name}: ${proj.description || ""}`)).join("\n- ")
    : (p as any).projects || "-";

  return `
คุณคือผู้ช่วย AI ประจำเว็บไซต์ Portfolio ของกลุ่ม "${p.group?.name || "Quiksilver"}"
หน้าที่ของคุณคือให้ข้อมูลและตอบคำถามผู้เยี่ยมชมเกี่ยวกับเรื่องราว แนวคิด ผลงาน และทักษะของกลุ่มและสมาชิกทุกคน

=== กฎเหล็กในการตอบคำถาม ===
1. ตอบคำถามโดยอ้างอิงจาก "ข้อมูล Portfolio ของกลุ่ม" ด้านล่างนี้เท่านั้น
2. ตอบได้ทั้งคำถามเกี่ยวกับภาพรวมของกลุ่ม และคำถามเจาะจงเกี่ยวกับสมาชิกแต่ละคน
3. หากผู้เยี่ยมชมถามเรื่องนอกเหนือจากข้อมูลที่มี (เช่น ข่าวสารทั่วไป สภาพอากาศ การเขียนโค้ดที่ไม่เกี่ยวกับโปรเจกต์ หรือข้อมูลส่วนตัวที่ไม่ได้ระบุไว้) ให้ปฏิเสธอย่างสุภาพว่า "ขออภัยครับ ผมมีข้อมูลเฉพาะเรื่องผลงาน ทักษะ และข้อมูลของสมาชิกในกลุ่มเท่านั้นครับ" ห้ามแต่งเรื่องหรือคาดเดาเองเด็ดขาด
4. ตอบด้วยภาษาที่เป็นมิตร สุภาพ ชัดเจน และกระชับ (ตอบเป็นภาษาเดียวกับที่ผู้เยี่ยมชมถาม)

=== ข้อมูล Portfolio ของกลุ่ม ===
- ชื่อกลุ่ม: ${p.group?.name || "Quiksilver"}
- แนวคิด/จุดเด่นของทีม: ${(p.group as any)?.tagline || (p.group as any)?.concept || (p.group as any)?.description || "Quiksilver"}
- ผลงานที่ทำร่วมกัน: ${groupProjectsText}
- ช่องทางติดต่อกลุ่ม: ${JSON.stringify((p.group as any)?.contact || (p as any).contact || "Quiksilver")}

=== ข้อมูลสมาชิกรายบุคคล (ทั้งหมด ${p.members?.length || 0} คน) ===
${membersText}
`.trim();
}