import { cn } from "@/lib/utils";
import ApolloClientProvider from "@/providers/ApolloClientProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dirt Racing Madness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloClientProvider>
      <html lang="en" data-theme="cupcake">
        <body className={cn(spaceGrotesk.className, "antialiased")}>
          {children}
        </body>
      </html>
    </ApolloClientProvider>
  );
}
