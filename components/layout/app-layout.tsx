import { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 px-6 py-6 md:px-8 lg:px-10 xl:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
