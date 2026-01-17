export function Footer() {
  return (
    <footer className="border-t border-[var(--foreground)]/10 bg-[var(--background)]">
      <div className="container flex h-16 items-center justify-center px-4 mx-auto max-w-7xl">
        <p className="text-sm text-[var(--foreground)]/60">
          Built with Next.js 15, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
