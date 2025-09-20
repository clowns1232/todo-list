"use client";

export default function Page() {
  return (
    <main className="mx-auto max-w-md p-6 space-y-4">
      <div className="rounded-xl bg-surface p-4 border border-border">
        <h2 className="font-semibold text-lg">색 테스트</h2>
        <p className="text-text-muted">세컨더리 텍스트</p>
        <button className="mt-3 rounded-md bg-primary px-3 py-2 text-white hover:opacity-90">
          Primary
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="px-2 py-1 rounded bg-rose-500 text-white">
          rose/500
        </span>
        <span className="px-2 py-1 rounded bg-violet-600 text-white">
          violet/600
        </span>
        <span className="px-2 py-1 rounded bg-lime-300">lime/300</span>
        <span className="px-2 py-1 rounded bg-amber-800 text-white">
          amber/800
        </span>
      </div>
    </main>
  );
}
