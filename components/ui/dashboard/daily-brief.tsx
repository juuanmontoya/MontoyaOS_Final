"use client";

export function DailyBrief() {
  return (
    <section className="rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-lg">

      <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
        DAILY BRIEF
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Buenos días, Juan 👋
      </h2>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
        Hoy todo está bajo control.
        Tu prioridad principal es finalizar la campaña de American Express.
        Esta noche tienes reunión de líderes y tu balance financiero sigue siendo positivo.
      </p>

    </section>
  );
}