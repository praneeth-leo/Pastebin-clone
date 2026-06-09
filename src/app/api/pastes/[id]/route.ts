import { NextResponse } from "next/server";
import { consumePaste } from "@/lib/pastes";

export const runtime = "nodejs";

type PasteApiProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: PasteApiProps) {
  const { id } = await params;
  const result = await consumePaste(id);

  if (result.status === "missing") {
    return NextResponse.json({ error: "Paste not found." }, { status: 404 });
  }

  if (result.status === "expired") {
    return NextResponse.json({ error: "Paste expired." }, { status: 410 });
  }

  return NextResponse.json({
    id: result.paste.id,
    content: result.paste.content,
    createdAt: result.paste.createdAt,
    expiresAt: result.paste.expiresAt,
    viewCount: result.paste.viewCount,
    maxViews: result.paste.maxViews,
    remainingViews: result.remainingViews,
  });
}
