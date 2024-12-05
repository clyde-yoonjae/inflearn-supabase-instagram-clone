// signup을 통해 user가 local:3000/signup/confirm/?code=1234-1234 이 형태로 접속했을 때
// get오퍼를 날린다.

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabse/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  // url에 code? 다음 숫자들 분리
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();

    // 이메일 인증 링크의 임시 코드를 실제 로그인 상태로 바꿔주는 함수
    await supabase.auth.exchangeCodeForSession(code);
  }

  // localhost:3000/
  return NextResponse.redirect(requestUrl.origin);
}
