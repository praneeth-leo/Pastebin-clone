import { NextResponse } from "next/server";
import { createPaste } from "@/lib/pastes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paste = await createPaste(body);
    const url = new URL(`/p/${paste.id}`, request.url);

    return NextResponse.json(
      {
        id: paste.id,
        url: url.toString(),
        expiresAt: paste.expiresAt,
        maxViews: paste.maxViews,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Provide non-empty content and valid expiry options." },
      { status: 400 },
    );
  }
}
