import { ReactNode } from "react";

interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AnalyticsCard({
  title,
  subtitle,
  children,
}: AnalyticsCardProps) {
  return (
    <section className="flex h-[430px] flex-col rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

      </div>

      <div className="flex-1 overflow-hidden">

        {children}

      </div>

    </section>
  );
}