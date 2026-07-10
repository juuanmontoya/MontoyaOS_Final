create extension if not exists pgcrypto;

create table if not exists public.calendar_events (
    id uuid primary key default gen_random_uuid(),

    title text not null,
    description text,

    start timestamptz not null,
    "end" timestamptz not null,

    all_day boolean not null default false,

    location text,

    color text not null default '#3B82F6',

    source text not null default 'calendar',

    source_id uuid,

    reminder jsonb,

    recurrence jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_calendar_events_start
    on public.calendar_events (start);

create index if not exists idx_calendar_events_source
    on public.calendar_events (source);