type Props = {
  title: string;
  description: string;
  emoji: string;
};

export function ComingSoonCard({
  title,
  description,
  emoji,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 text-3xl">{emoji}</div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>

      <span className="mt-5 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
        Próximamente
      </span>
    </div>
  );
}