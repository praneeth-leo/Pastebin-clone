"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const expiryOptions = [
  { value: "never", label: "Never", detail: "Keep until manually removed" },
  { value: "10m", label: "10 min", detail: "Short review window" },
  { value: "1h", label: "1 hour", detail: "Temporary handoff" },
  { value: "1d", label: "1 day", detail: "Daily expiry" },
  { value: "7d", label: "7 days", detail: "Longer collaboration" },
];

export function CreatePasteForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const maxViews = formData.get("maxViews")?.toString().trim();

    try {
      const response = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.get("content")?.toString() ?? "",
          expiresIn: formData.get("expiresIn")?.toString() ?? "never",
          maxViews: maxViews ? Number(maxViews) : undefined,
        }),
      });

      const result = (await response.json()) as {
        id?: string;
        error?: string;
      };

      if (!response.ok) {
        setError(result.error ?? "Could not create paste.");
        return;
      }

      if (!result.id) {
        setError("Server did not return a paste id.");
        return;
      }

      router.push(`/p/${result.id}`);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2px] border border-[#ff8a2a]/30 bg-[#0d0906] p-5 shadow-2xl shadow-black/50 sm:p-7"
    >
      <label
        htmlFor="content"
        className="text-sm font-medium uppercase tracking-[0.18em] text-[#ff9f45]"
      >
        Paste content
      </label>
      <textarea
        id="content"
        name="content"
        required
        minLength={1}
        maxLength={50000}
        rows={14}
        placeholder="Drop your text here..."
        className="mt-3 min-h-72 w-full resize-y rounded-[2px] border border-[#382113] bg-[#070504] p-4 font-mono text-sm leading-6 text-[#fff3df] outline-none transition placeholder:text-[#8f7157] focus:border-[#ff8a2a] focus:ring-2 focus:ring-[#ff8a2a]/20"
      />

      <fieldset className="mt-5">
        <legend className="text-sm font-medium uppercase tracking-[0.18em] text-[#ff9f45]">
          Expiry preference
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-5">
          {expiryOptions.map((option) => (
            <label
              key={option.value}
              className="group cursor-pointer rounded-[2px] border border-[#382113] bg-[#130b07] p-3 transition hover:border-[#ff8a2a]/70 has-[:checked]:border-[#ff8a2a] has-[:checked]:bg-[#ff8a2a]/12"
            >
              <input
                type="radio"
                name="expiresIn"
                value={option.value}
                defaultChecked={option.value === "never"}
                className="sr-only"
              />
              <span className="block text-sm font-semibold text-white">
                {option.label}
              </span>
              <span className="mt-1 block text-xs leading-4 text-[#bfa98d]">
                {option.detail}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="text-sm font-medium uppercase tracking-[0.18em] text-[#ff9f45]">
          View limit
          <input
            name="maxViews"
            type="number"
            min={1}
            max={10000}
            placeholder="Unlimited"
            className="mt-2 h-12 w-full rounded-[2px] border border-[#382113] bg-[#070504] px-3 text-sm text-[#fff3df] outline-none transition placeholder:text-[#8f7157] focus:border-[#ff8a2a] focus:ring-2 focus:ring-[#ff8a2a]/20"
          />
        </label>
        <p className="text-sm leading-6 text-[#bfa98d] sm:max-w-52">
          Leave blank for unlimited views.
        </p>
      </div>

      {error ? (
        <p className="mt-4 text-sm font-medium text-[#ffb15f]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-12 w-full rounded-[2px] bg-[#ff8a2a] px-4 text-sm font-bold uppercase tracking-[0.2em] text-[#120905] shadow-[0_16px_45px_rgba(255,106,0,0.2)] transition hover:bg-[#ffb15f] focus:outline-none focus:ring-2 focus:ring-[#ffb15f] focus:ring-offset-2 focus:ring-offset-[#0d0906] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create shareable link"}
      </button>
    </form>
  );
}
