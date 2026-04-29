create extension if not exists postgis;
create extension if not exists pgcrypto;

-- Local fallback for Supabase auth tables (for docker-compose postgres).
create schema if not exists auth;
create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create or replace function app_current_user_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.user_id', true), '')::uuid
$$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null check (role in ('admin', 'user')) default 'user',
  created_at timestamptz not null default now()
);

create table if not exists water_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  latitude double precision not null,
  longitude double precision not null,
  geom geography(point, 4326) generated always as (st_setsrid(st_makepoint(longitude, latitude), 4326)::geography) stored,
  capacity_l_min integer not null check (capacity_l_min > 0),
  status text not null check (status in ('aktiv', 'eingeschraenkt', 'ausser_betrieb')),
  notes text,
  last_checked_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists water_sources_geom_idx on water_sources using gist(geom);

create table if not exists hose_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  diameter_mm integer not null,
  pressure_loss_table jsonb not null,
  active boolean not null default true
);

create table if not exists app_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null
);

alter table profiles enable row level security;
alter table water_sources enable row level security;
alter table hose_types enable row level security;
alter table app_settings enable row level security;

create policy "read profiles own" on profiles for select using (app_current_user_id() = id);
create policy "admin full profiles" on profiles for all using ((select role from profiles where id = app_current_user_id()) = 'admin');

create policy "read water sources" on water_sources for select using (true);
create policy "admin write water sources" on water_sources for all using ((select role from profiles where id = app_current_user_id()) = 'admin');

create policy "read hose types" on hose_types for select using (true);
create policy "admin write hose types" on hose_types for all using ((select role from profiles where id = app_current_user_id()) = 'admin');

create policy "read app settings" on app_settings for select using (true);
create policy "admin write app settings" on app_settings for all using ((select role from profiles where id = app_current_user_id()) = 'admin');
create policy "read profiles own" on profiles for select using (auth.uid() = id);
create policy "admin full profiles" on profiles for all using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "read water sources" on water_sources for select using (true);
create policy "admin write water sources" on water_sources for all using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "read hose types" on hose_types for select using (true);
create policy "admin write hose types" on hose_types for all using ((select role from profiles where id = auth.uid()) = 'admin');

create policy "read app settings" on app_settings for select using (true);
create policy "admin write app settings" on app_settings for all using ((select role from profiles where id = auth.uid()) = 'admin');
