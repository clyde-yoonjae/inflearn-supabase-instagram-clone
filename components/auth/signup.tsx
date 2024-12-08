'use client';

import { Button, Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createBrowserSupabaseClient } from 'utils/supabase/clients';

export default function SignUp({ setView }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();

  // signUp mutation

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
      },
    });
  };

  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // 유저가 회원가입 끝난 후 링크 클릭한 후, 회원가입완료 다 처리되면 이 url로 넘어올 것이다.
          emailRedirectTo: 'http://localhost:3000/signup/confirm',
        },
      });
      if (data) {
        setConfirmationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup',
      });
      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-2 border border-gray-400 bg-white px-10 pb-6 pt-10">
        <img src={'/images/inflearngram.png'} className="mb-6 w-60" />
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="otp"
            type="text"
            className="w-full rounded-sm"
            placeholder="OTP 6자리를 입력해주세요"
          />
        ) : (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              type="email"
              className="w-full rounded-sm"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              type="password"
              className="w-full rounded-sm"
            />
          </>
        )}

        <Button
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signupMutation.mutate();
            }
          }}
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPaused
              : signupMutation.isPending
          }
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPaused
              : signupMutation.isPending
          }
          color="light-blue"
          className="text-md w-full py-1"
        >
          {confirmationRequired ? '인증하기' : '가입하기'}
          {/*전송된 이메일 클릭하면, supabase서버 거치고
           local:3000/signup/confirm/?code=1234-1234- 이 형태로 오게된다.*/}
        </Button>
        <Button
          onClick={() => signInWithKakao()}
          className="text-md w-full bg-yellow-700 py-1"
        >
          카카오 로그인
        </Button>
      </div>
      <div className="w-full max-w-lg border border-gray-400 bg-white py-4 text-center">
        이미 계정이 있으신가요?{' '}
        <button
          className="font-bold text-light-blue-600"
          onClick={() => setView('SIGNIN')}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
