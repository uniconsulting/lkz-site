import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { randomUUID } from "node:crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = extname(file.name).toLowerCase() || ".jpg";
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
