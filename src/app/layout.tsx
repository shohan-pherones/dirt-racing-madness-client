import { Footer, Header } from "@/components/blocks";
import { cn } from "@/lib/utils";
import ApolloClientProvider from "@/providers/ApolloClientProvider";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
      <ReduxStoreProvider>
        <html lang="en" data-theme="sunset">
          <body className={cn(spaceGrotesk.className, "antialiased")}>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </body>
        </html>
      </ReduxStoreProvider>
    </ApolloClientProvider>
  );
}
