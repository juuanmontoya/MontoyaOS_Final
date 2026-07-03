import type { Metadata } from "next";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/app-layout";

export const metadata: Metadata = {
  title: "MontoyaOS",
  description: "Sistema Operativo Personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <TooltipProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </TooltipProvider>
      </body>
    </html>
  );
}