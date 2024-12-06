"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabse/clients";
export default function SignIn({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createBrowserSupabaseClient();

  const signInMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
        <img src={"/images/inflearngram.png"} className="mb-6 w-60" />
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
        <Button
          onClick={() => {
            signInMutation.mutate();
          }}
          loading={signInMutation.isPending}
          disabled={signInMutation.isPending}
          color="light-blue"
          className="text-md w-full py-1"
        >
          로그인
        </Button>
      </div>
      <div className="w-full max-w-lg border border-gray-400 bg-white py-4 text-center">
        아직 계정이 없으신가요?{" "}
        <button
          className="font-bold text-light-blue-600"
          onClick={() => setView("SIGNUP")}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
