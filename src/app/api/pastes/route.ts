import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createPaste } from "@/lib/pastes";

export const runtime = "nodejs";

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
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Provide non-empty content and valid expiry options.",
          details: error.issues.map((issue) => issue.message),
        },
        { status: 422 },
      );
    }

    console.error("Failed to create paste", error);

    return NextResponse.json(
      {
        error:
          "Could not create paste. Check DATABASE_URL and database migrations.",
      },
      { status: 500 },
    );
  }
}
