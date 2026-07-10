import type { DashboardBriefItem } from "@/core/dashboard-engine/brief";

interface HeroWidgetProps {
  brief: DashboardBriefItem[];
}

export function HeroWidget({
  brief,
}: HeroWidgetProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-xl">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-100">
          MONTOYA OS
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Todo lo importante.
          <br />
          En un solo lugar.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100">
          Tu agenda, tus finanzas, tu estudio bíblico, tu trabajo y tu vida
          organizados desde un único lugar.
        </p>

        {brief.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {brief.slice(0, 3).map((item) => (
              <span
                key={item.id}
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur"
              >
                {item.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}