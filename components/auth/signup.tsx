import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            console.log("signup");
          }}
          color="light-blue"
          className="text-md w-full py-1"
        >
          가입하기
        </Button>
      </div>
      <div className="w-full max-w-lg border border-gray-400 bg-white py-4 text-center">
        이미 계정이 있으신가요?{" "}
        <button
          className="font-bold text-light-blue-600"
          onClick={() => setView("SIGNIN")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
