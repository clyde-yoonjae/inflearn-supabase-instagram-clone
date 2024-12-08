'use client';

import { Button } from '@material-tailwind/react';
import { createBrowserSupabaseClient } from 'utils/supabase/clients';

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();
  return (
    <Button
      color="red"
      onClick={async () => {
        supabase.auth.signOut();
      }}
    >
      로그아웃
    </Button>
  );
}
