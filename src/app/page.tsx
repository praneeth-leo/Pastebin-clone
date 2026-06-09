import Link from "next/link";
import { CreatePasteForm } from "@/app/components/create-paste-form";

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

          <CreatePasteForm />
        </div>
      </section>
    </main>
  );
}
