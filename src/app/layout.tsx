import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smartcash Admin",
  description: "Smartcash Admin for managing Staff Loans and transactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/smartcash-logo.svg" type="image/x-icon" />
      </head>
      <body>
        <Provider>
          <div className="h-full">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
