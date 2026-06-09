import Link from "next/link";
import { headers } from "next/headers";
import { consumePaste } from "@/lib/pastes";

export const dynamic = "force-dynamic";

type PastePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(date: Date | null) {
  if (!date) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function PastePage({ params }: PastePageProps) {
  const { id } = await params;
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const shareUrl = `${protocol}://${host}/p/${id}`;
  const result = await consumePaste(id);

  if (result.status !== "available") {
    return (
      <main className="min-h-screen bg-[#050403] px-5 py-8 text-[#fff3df]">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center">
          <div className="rounded-[2px] border border-[#ff8a2a]/30 bg-[#0d0906] p-6 shadow-2xl shadow-black/50">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#ff9f45]">
              Paste unavailable
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold leading-tight text-white">
              This paste is missing or expired.
            </h1>
            <p className="mt-3 leading-7 text-[#d9c5aa]">
              The link may be incorrect, the time limit may have passed, or the
              maximum number of views may have been reached.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center rounded-[2px] bg-[#ff8a2a] px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#120905] hover:bg-[#ffb15f]"
            >
              Create a new paste
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const { paste, remainingViews } = result;

  return (
    <main className="min-h-screen bg-[#050403] text-[#fff3df]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ff8a2a]/25 pb-5">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-wide text-white"
          >
            Aurum Paste
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-[2px] border border-[#ff8a2a]/40 bg-[#120c08] px-4 text-sm font-medium text-[#fff3df] hover:border-[#ff8a2a]"
          >
            New paste
          </Link>
        </header>

        <div className="py-8">
          <div className="grid gap-3 border-b border-[#ff8a2a]/25 pb-5 text-sm text-[#bfa98d] sm:grid-cols-3">
            <p className="rounded-[2px] border border-[#ff8a2a]/20 bg-[#120c08] p-4 shadow-xl shadow-black/20">
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#ff9f45]">
                Paste ID
              </span>
              <span className="mt-2 block font-mono text-[#fff3df]">
                {paste.id}
              </span>
            </p>
            <p className="rounded-[2px] border border-[#ff8a2a]/20 bg-[#120c08] p-4 shadow-xl shadow-black/20">
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#ff9f45]">
                Expires
              </span>
              <span className="mt-2 block text-[#fff3df]">
                {formatDate(paste.expiresAt)}
              </span>
            </p>
            <p className="rounded-[2px] border border-[#ff8a2a]/20 bg-[#120c08] p-4 shadow-xl shadow-black/20">
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-[#ff9f45]">
                Views remaining
              </span>
              <span className="mt-2 block text-[#fff3df]">
                {remainingViews === null ? "Unlimited" : remainingViews}
              </span>
            </p>
          </div>

          <label
            htmlFor="share-link"
            className="mt-6 block text-sm font-medium uppercase tracking-[0.18em] text-[#ff9f45]"
          >
            Shareable link
          </label>
          <input
            id="share-link"
            readOnly
            value={shareUrl}
            className="mt-2 h-12 w-full rounded-[2px] border border-[#382113] bg-[#0d0906] px-3 font-mono text-sm text-[#fff3df] outline-none"
          />

          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-[2px] border border-[#ff8a2a]/25 bg-[#0d0906] p-5 font-mono text-sm leading-6 text-[#fff3df] shadow-2xl shadow-black/40">
            {paste.content}
          </pre>
        </div>
      </section>
    </main>
  );
}
