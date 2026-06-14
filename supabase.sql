-- Lost Light — Supabase スキーマ
-- SupabaseのSQL Editorで実行する。未接続でもアプリはLocalStorageで動作する。

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  answer text,
  theme text,
  light_gauge integer default 0,
  question_count integer default 0,
  is_completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists game_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete cascade,
  role text check (role in ('user', 'assistant', 'system')),
  content text not null,
  score integer,
  created_at timestamptz default now()
);

create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references game_sessions(id) on delete set null,
  final_answer text,
  true_answer text,
  is_correct boolean,
  rank text,
  total_score integer,
  title text,
  created_at timestamptz default now()
);

-- RLS: 匿名プレイのため anon に insert / select を明示的に許可する。
-- （RLS有効 + ポリシー無しだと全アクセスが拒否され「保存されない」事故になる）
alter table game_sessions enable row level security;
alter table game_logs enable row level security;
alter table results enable row level security;

create policy "anon insert sessions" on game_sessions for insert to anon with check (true);
create policy "anon select sessions" on game_sessions for select to anon using (true);

create policy "anon insert logs" on game_logs for insert to anon with check (true);
create policy "anon select logs" on game_logs for select to anon using (true);

create policy "anon insert results" on results for insert to anon with check (true);
create policy "anon select results" on results for select to anon using (true);
