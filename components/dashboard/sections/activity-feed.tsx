const activities = [
  {
    title: "Bienvenido a MontoyaOS",
    description: "Tu sistema operativo personal está listo para usarse.",
  },
  {
    title: "Módulo de Finanzas",
    description: "Integración disponible y lista para conectarse al Dashboard.",
  },
  {
    title: "Próximo paso",
    description: "Implementar los widgets inteligentes del Home.",
  },
];

export function ActivityFeed() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Actividad reciente
        </h2>

        <p className="text-sm text-muted-foreground">
          Últimos eventos registrados en MontoyaOS.
        </p>
      </div>

      <div className="rounded-xl border bg-card">
        {activities.map((activity, index) => (
          <div
            key={activity.title}
            className={`p-5 ${
              index !== activities.length - 1 ? "border-b" : ""
            }`}
          >
            <h3 className="font-medium">{activity.title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}