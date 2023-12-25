import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";

import { Toaster } from "~/components/ui/sonner";
import { Providers } from "~/components/providers";
import SessionProvider from "~/components/providers/session-provider";

import { cn } from "~/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My Bazaar",
    template: "%s | My Bazaar",
  },
  description: "Shop till you drop",
  icons: [
    {
      url: "logo.svg",
      href: "logo.svg",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("h-[5000px] bg-neutral-200 text-base", inter.className)}
      >
        <SessionProvider session={session}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
