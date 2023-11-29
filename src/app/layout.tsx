import type { Metadata } from "next";
import MainComponent from "./MainComponent";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampaignHub",
  description: "Streamlining Your Message Mastery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MainComponent>{children}</MainComponent>
      </body>
    </html>
  );
}
