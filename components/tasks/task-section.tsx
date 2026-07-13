import type { ReactNode } from "react";

interface TaskSectionProps {
  title: string;
  children: ReactNode;
}

export function TaskSection({
  title,
  children,
}: TaskSectionProps) {
  return (
    <section className="space-y-4">
      <div className="border-b pb-2">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}