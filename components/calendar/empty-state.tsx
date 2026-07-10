import { AppCard } from "@/components/ui/app-card";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <AppCard className="border-dashed text-center hover:shadow-sm">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </AppCard>
  );
}