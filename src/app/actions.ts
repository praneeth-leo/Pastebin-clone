"use server";

import { redirect } from "next/navigation";
import { createPaste } from "@/lib/pastes";

export async function createPasteAction(formData: FormData) {
  const maxViewsValue = formData.get("maxViews")?.toString().trim();

  const paste = await createPaste({
    content: formData.get("content")?.toString() ?? "",
    expiresIn: formData.get("expiresIn")?.toString() || "never",
    maxViews: maxViewsValue ? Number(maxViewsValue) : undefined,
  });

  redirect(`/p/${paste.id}`);
}
