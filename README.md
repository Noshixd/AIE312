# ชื่อกลุ่ม (แก้ตรงนี้) — Chat AI Portfolio

เว็บแอป Portfolio ของกลุ่ม ที่ให้ผู้เยี่ยมชม **คุยกับ AI ("Siesta")** เพื่อถามเรื่องกลุ่ม ผลงาน และทักษะของสมาชิกแต่ละคน
AI ตอบโดยอิงข้อมูล portfolio จริงในฐานข้อมูลเท่านั้น ไม่ตอบแบบทั่วไป

| | ลิงก์ |
|---|---|
| 🌐 เว็บที่ deploy แล้ว | https://<ชื่อ-fe>.onrender.com (แก้ตรงนี้) |
| ⚙️ API | https://<ชื่อ-be>.onrender.com/api/health (แก้ตรงนี้) |
| 📊 Presentation | (ใส่ลิงก์สไลด์) |

## สมาชิก

| ชื่อ | บทบาท | รับผิดชอบ |
|---|---|---|
| อัสสชิ บัวชุม (Noah) | Backend & DevOps | `BE/`, ฐานข้อมูล, `.gitlab-ci.yml` |
| (แก้ชื่อ) | Frontend | `FE/` |
| (แก้ชื่อ) | | |
| (แก้ชื่อ) | | |

## สถาปัตยกรรม

```
ผู้เยี่ยมชม ──▶ FE (React + nginx) ──/api/*──▶ BE (Express) ──▶ PostgreSQL
                                                  │
                                                  └──▶ Gemini (system prompt + ข้อมูล portfolio ทั้งกลุ่ม)
```

| ส่วน | เทคโนโลยี | ทำอะไร |
|---|---|---|
| `FE/` | React + TypeScript + Vite, nginx | หน้า Portfolio (กลุ่ม + สมาชิก + ช่องทางติดต่อ) และหน้าแชต · nginx เสิร์ฟหน้าเว็บและส่งต่อ `/api` ไป BE |
| `BE/` | Express 5 + TypeScript | API ของ portfolio และแชต · ประกอบ system prompt จากข้อมูลทั้งกลุ่มแล้วส่งให้ AI |
| ฐานข้อมูล | PostgreSQL | ข้อมูลกลุ่ม สมาชิก ผลงาน ช่องทางติดต่อ และประวัติการสนทนา |
| CI/CD | GitLab CI, Docker Hub, Trivy, Render | test → build image → scan → deploy อัตโนมัติทุกครั้งที่ push เข้า `main` |

## ติดตั้งและรัน

ต้องมี **Docker** (และ **Node.js 22+** ถ้าจะรันแบบ dev)

```bash
git clone <ลิงก์ repo>
cd <ชื่อ repo>
cp BE/.env.example BE/.env        # แล้วใส่ LLM_API_KEY (สร้างที่ https://aistudio.google.com/apikey)
```

**รันทั้งระบบ**

```bash
docker-compose up --build -d      # เว็บ http://localhost:8080  ·  API http://localhost:3000/api/health
docker-compose down
```

**รันแบบ dev (แก้โค้ดแล้วเห็นผลทันที)** — เปิด 3 terminal

```bash
docker-compose up db              # 1) PostgreSQL
cd BE && npm install && npm run dev   # 2) API ที่ :3000
cd FE && npm install && npm run dev   # 3) หน้าเว็บที่ http://localhost:5173
```

ไม่ใส่ `LLM_API_KEY` ก็รันได้ — BE จะตอบแบบโหมดออฟไลน์จากข้อมูล portfolio

**แก้ข้อมูลกลุ่มและสมาชิก:** แก้ `BE/seed/portfolio.json` แล้ว restart BE (หรือ push ขึ้น `main` ให้ deploy ใหม่)

## ทดสอบ

```bash
docker-compose up -d db
docker-compose exec db createdb -U chat chat_test     # ครั้งแรกครั้งเดียว
cd BE && npm run check && npm test
cd FE && npm run typecheck && npm run build
```

## CI/CD

ไฟล์ [`.gitlab-ci.yml`](.gitlab-ci.yml) — BE และ FE แยกสายกัน (ฝั่งหนึ่งพังไม่ขวางอีกฝั่ง)

```
git push ─▶ test ─▶ build + push image (Docker Hub) ─▶ scan (Trivy) ─▶ Render Deploy Hook
```

ตั้งค่าที่ GitLab → Settings → CI/CD → Variables: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `RENDER_DEPLOY_HOOK_BE`, `RENDER_DEPLOY_HOOK_FE`
ขั้นตอนตั้งค่า Render ครั้งแรกดูที่ [`BE/README.md`](BE/README.md#cicd-gitlab)

## ค่า env

| ตัวแปร | ใช้ที่ | ความหมาย |
|---|---|---|
| `DATABASE_URL` | BE | ที่อยู่ PostgreSQL |
| `LLM_API_KEY`, `LLM_MODEL`, `LLM_BASE_URL` | BE | ต่อ Gemini |
| `BE_URL` | FE | nginx ส่งต่อ `/api` ไปที่นี่ เช่น `https://<ชื่อ-be>.onrender.com` (ขึ้นต้น `https://` ห้ามมี `/` ท้าย) |

ค่าทั้งหมดของ BE ดูใน [`BE/.env.example`](BE/.env.example) — ห้าม commit ไฟล์ `.env` หรือ key จริง

## เอกสารเพิ่มเติม

- [`BE/README.md`](BE/README.md) — API ทุก endpoint, ฐานข้อมูล, การเชื่อมต่อ AI, การตั้งค่า deploy
- [`FE/README.md`](FE/README.md) — หน้าเว็บและการตั้งค่า nginx
