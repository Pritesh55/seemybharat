import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

// import ThemeToggle button ::

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="flex justify-end">
          <ThemeToggle />
          {/* Used ThemeToggle button :: */}
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Next.js 16 + React Aria (Luma) + Supabase
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">Prit E-Commerce</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          A high-performance, accessible, and beautifully designed shopping experience.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Button size="lg" className="cursor-pointer gap-2">
            <ShoppingBag className="h-4 w-4" />
            Explore Store
          </Button>
          <Button variant="outline" size="lg" className="cursor-pointer gap-2">
            Admin Panel
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-2xl border bg-card p-4 text-sm font-mono text-card-foreground shadow-xs">
          Status: Phase 1 &bull; Step 2 (React Aria UI & Dark Mode) Successfully Configured
        </div>
      </div>
    </main>
  );
}
