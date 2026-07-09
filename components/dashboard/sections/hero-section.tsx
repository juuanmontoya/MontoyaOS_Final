export function HeroSection() {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Buenos días"
      : currentHour < 18
      ? "Buenas tardes"
      : "Buenas noches";

  const today = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const hero = {
    greeting,
    userName: "Juan",
    status: "Sistema saludable",
    summary:
      "Todo está funcionando correctamente. Bienvenido a tu centro de control personal.",
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground capitalize">
          {today}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {hero.greeting}, {hero.userName} 👋
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          {hero.summary}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Estado del sistema
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="font-semibold">
            {hero.status}
          </span>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Próximamente este panel mostrará el estado general de Finanzas,
          Tareas, Calendario e IA.
        </p>
      </div>
    </section>
  );
}