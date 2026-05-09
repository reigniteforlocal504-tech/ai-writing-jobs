// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Writing Jobs - Find AI work. Land it faster.",
  description: "Job aggregator + AI prompt toolkit for AI content writers and customer service workers pivoting to AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-border bg-background sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-accent">
              AI Writing Jobs
            </Link>
            
            <Link
              href="/saved"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Saved Jobs
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
