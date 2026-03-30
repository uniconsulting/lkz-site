import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { randomUUID } from "node:crypto";
import { isAdminAuthenticated } from "@/lib/auth";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 400 });
  }

  const ext = extname(file.name).toLowerCase() || ".pdf";
  const filename = `${randomUUID()}${ext}`;

  const uploadsDir =
    process.env.UPLOADS_DIR && process.env.UPLOADS_DIR.length > 0
      ? process.env.UPLOADS_DIR
      : join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(join(uploadsDir, filename), Buffer.from(bytes));

  const urlPrefix = process.env.UPLOADS_URL_PREFIX ?? "/uploads";
  return NextResponse.json({ url: `${urlPrefix}/${filename}` });
}
