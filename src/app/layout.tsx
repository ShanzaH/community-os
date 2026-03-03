import type { ReactNode } from "react";
import { PanelProvider } from "@/contexts/panel-context";
import "./globals.css";

export const metadata = {
  title: "Community OS",
  description: "Dark-themed community management dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full bg-background text-foreground overflow-hidden antialiased">
        <PanelProvider>{children}</PanelProvider>
      </body>
    </html>
  );
}
