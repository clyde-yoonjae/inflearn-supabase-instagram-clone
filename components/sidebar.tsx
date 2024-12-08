'use client';
import { Home, Logout, People, Search, Send } from '@mui/icons-material';
import Link from 'next/link';
import { createBrowserSupabaseClient } from 'utils/supabase/clients';
export default function Sidebar() {
  const supabase = createBrowserSupabaseClient();
  return (
    <aside className="flex h-screen w-fit flex-col justify-between border-r border-gray-300 p-6">
      {/* Home버튼 + People Page ~ Chat Page */}
      <div className="flex flex-col gap-4">
        <Link href="/">
          <Home className="mb-10 text-2xl" />
        </Link>
        <Link href="/people">
          <People className="text-2xl" />
        </Link>
        <Link href="/discover">
          <Search className="text-2xl" />
        </Link>
        <Link href="/chat">
          <Send className="text-2xl" />
        </Link>
      </div>
      {/* Logout Button */}
      <div>
        <button onClick={() => console.log('logout')}>
          <Logout
            className="text-2xl text-deep-purple-900"
            onClick={async () => {
              supabase.auth.signOut();
            }}
          />
        </button>
      </div>
    </aside>
  );
}
