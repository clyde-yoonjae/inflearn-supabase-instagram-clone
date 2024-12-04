import LogoutButton from "components/logout-button";

export const metadata = {
  title: "Inflearngram",
  description: "Instagram clone project",
};

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-bold">Welcome {"lopun.jh"}!</h1>
      <LogoutButton />
    </main>
  );
}
