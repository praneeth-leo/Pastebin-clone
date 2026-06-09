import Link from "next/link";
import { createPasteAction } from "@/app/actions";

const expiryOptions = [
  { value: "never", label: "Never", detail: "Keep until manually removed" },
  { value: "10m", label: "10 min", detail: "Short review window" },
  { value: "1h", label: "1 hour", detail: "Temporary handoff" },
  { value: "1d", label: "1 day", detail: "Daily expiry" },
  { value: "7d", label: "7 days", detail: "Longer collaboration" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050403] text-[#fff3df]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-7 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[#ff8a2a]/25 pb-5">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-wide text-white"
          >
            Aurum Paste
          </Link>
          <span className="hidden text-sm text-[#ff9f45] sm:block">
            confidential text vault
          </span>
        </header>

        <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-7">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-[#ff9f45]">
              Private paste suite
            </p>
            <h1 className="font-display max-w-xl text-5xl font-semibold leading-[0.95] text-white sm:text-7xl">
              Share sensitive text with quiet precision.
            </h1>
            <p className="max-w-lg text-[1.05rem] leading-8 text-[#d9c5aa]">
              Create a short link, set access preferences, and let the paste
              expire by time or views when the moment has passed.
            </p>
            <div className="grid max-w-lg grid-cols-3 gap-3 text-sm">
              <div className="border border-[#ff8a2a]/25 bg-[#120c08] p-4 shadow-xl shadow-black/20">
                <span className="block text-2xl font-semibold text-white">
                  10
                </span>
                <span className="mt-1 block text-[#bfa98d]">char links</span>
              </div>
              <div className="border border-[#ff8a2a]/25 bg-[#120c08] p-4 shadow-xl shadow-black/20">
                <span className="block text-2xl font-semibold text-white">
                  2
                </span>
                <span className="mt-1 block text-[#bfa98d]">expiry modes</span>
              </div>
              <div className="border border-[#ff8a2a]/25 bg-[#120c08] p-4 shadow-xl shadow-black/20">
                <span className="block text-2xl font-semibold text-white">
                  API
                </span>
                <span className="mt-1 block text-[#bfa98d]">test ready</span>
              </div>
            </div>
          </div>

          <form
            action={createPasteAction}
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

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-[2px] bg-[#ff8a2a] px-4 text-sm font-bold uppercase tracking-[0.2em] text-[#120905] shadow-[0_16px_45px_rgba(255,106,0,0.2)] transition hover:bg-[#ffb15f] focus:outline-none focus:ring-2 focus:ring-[#ffb15f] focus:ring-offset-2 focus:ring-offset-[#0d0906]"
            >
              Create shareable link
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
