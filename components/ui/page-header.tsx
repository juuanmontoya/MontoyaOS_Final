import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

      <div className="max-w-3xl">

        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-3 text-5xl font-extrabold tracking-tight">
          {title}
        </h1>

        {description && (
  <div className="mt-4 space-y-1 text-xl leading-relaxed text-muted-foreground">
    {description.split("\n").map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
)}

      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}

    </section>
  );
}