import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createPasteSchema = z.object({
  content: z.string().trim().min(1).max(50_000),
  expiresIn: z.enum(["never", "10m", "1h", "1d", "7d"]).default("never"),
  maxViews: z.coerce.number().int().min(1).max(10_000).optional(),
});

const expiryDurations: Record<string, number> = {
  "10m": 10 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
};

export async function createPaste(input: unknown) {
  const data = createPasteSchema.parse(input);
  const duration = expiryDurations[data.expiresIn];

  return prisma.paste.create({
    data: {
      id: nanoid(10),
      content: data.content,
      expiresAt: duration ? new Date(Date.now() + duration) : null,
      maxViews: data.maxViews ?? null,
    },
  });
}

export async function consumePaste(id: string) {
  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return { status: "missing" as const };
  }

  const now = new Date();
  const expiredByTime = paste.expiresAt !== null && paste.expiresAt <= now;
  const expiredByViews =
    paste.maxViews !== null && paste.viewCount >= paste.maxViews;

  if (expiredByTime || expiredByViews) {
    await prisma.paste.delete({ where: { id } }).catch(() => undefined);
    return { status: "expired" as const };
  }

  const viewedPaste = await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return {
    status: "available" as const,
    paste: viewedPaste,
    remainingViews:
      viewedPaste.maxViews === null
        ? null
        : Math.max(viewedPaste.maxViews - viewedPaste.viewCount, 0),
  };
}
