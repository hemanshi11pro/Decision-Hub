import { Link } from "wouter";
import { Moon, Sun, Box } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary transition-colors hover:text-primary/80">
            <Box className="h-6 w-6" />
            <span>RandomToolbox</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center p-4 py-8 md:py-12">
        <div className="w-full max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>RandomToolbox &copy; {new Date().getFullYear()}. Free tools for everyone.</p>
        </div>
      </footer>
    </div>
  );
}