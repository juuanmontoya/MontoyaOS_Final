import { ArrowRight } from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

type ComingSoonCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export function ComingSoonCard({
  emoji,
  title,
  description,
}: ComingSoonCardProps) {
  return (
    <AppCard className="group cursor-pointer">
      <div className="flex h-full flex-col">
        <div className="mb-5 text-4xl">
          {emoji}
        </div>

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
          <span>Próximamente</span>

          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </AppCard>
  );
}