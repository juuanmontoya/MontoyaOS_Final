import type { Metadata } from "next";
import "./globals.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "sonner";

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

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}