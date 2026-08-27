import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          🚀 Welcome to <span className="text-blue-600">Prit E-Commerce</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Architecture: Next.js 16 (App Router) + Supabase + Drizzle ORM + Tailwind CSS + Zustand + Razorpay
        </p>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 text-sm font-mono text-gray-700 dark:text-gray-300">
          Status: Phase 1 &bull; Directory Structure Initialized &bull; Ready for UI Setup
        </div>
      </div>
    </main>
  );
}
