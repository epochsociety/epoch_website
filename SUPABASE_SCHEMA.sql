-- Supabase Schema for Epoch Society

-- 1. Create Content table (stores landing page configurations as a JSONB payload)
create table if not exists epoch_content (
  id text primary key,
  data jsonb not null
);

-- 2. Create Members table (stores executive board/society members)
create table if not exists epoch_members (
  id text primary key,
  name text not null,
  role text not null,
  image text not null,
  bio text not null,
  linkedin text,
  year text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Events table (stores event descriptions and document attachments)
create table if not exists epoch_events (
  id text primary key,
  title text not null,
  date text not null,
  description text not null,
  image text not null,
  "registerUrl" text,
  "isUpcoming" boolean default true,
  documents jsonb default '[]'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Credentials table (stores developer and faculty logins)
create table if not exists epoch_creds (
  role text primary key,
  username text not null,
  password text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table epoch_content enable row level security;
alter table epoch_members enable row level security;
alter table epoch_events enable row level security;
alter table epoch_creds enable row level security;

-- Drop existing policies if they exist (prevents SQL errors on multiple executions)
drop policy if exists "Enable read access for all users" on epoch_content;
drop policy if exists "Enable all access for all users" on epoch_content;

drop policy if exists "Enable read access for members" on epoch_members;
drop policy if exists "Enable all access for members" on epoch_members;

drop policy if exists "Enable read access for events" on epoch_events;
drop policy if exists "Enable all access for events" on epoch_events;

drop policy if exists "Enable read access for creds" on epoch_creds;
drop policy if exists "Enable all access for creds" on epoch_creds;

-- Create policies for public access (all actions enabled for ease of prototyping/setup)
-- Note: In a production environment, restrict write operations (INSERT, UPDATE, DELETE)
-- to authenticated roles using policies like `auth.role() = 'authenticated'`.

create policy "Enable read access for all users" on epoch_content for select using (true);
create policy "Enable all access for all users" on epoch_content for all using (true) with check (true);

create policy "Enable read access for members" on epoch_members for select using (true);
create policy "Enable all access for members" on epoch_members for all using (true) with check (true);

create policy "Enable read access for events" on epoch_events for select using (true);
create policy "Enable all access for events" on epoch_events for all using (true) with check (true);

create policy "Enable read access for creds" on epoch_creds for select using (true);
create policy "Enable all access for creds" on epoch_creds for all using (true) with check (true);
