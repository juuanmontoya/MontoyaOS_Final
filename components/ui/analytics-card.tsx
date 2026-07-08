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
    <section className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}