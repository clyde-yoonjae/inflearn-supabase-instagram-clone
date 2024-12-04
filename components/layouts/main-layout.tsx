import Sidebar from "components/sidebar";
export default async function MainLayout({ children }) {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Sidebar />
      {children}
    </main>
  );
}
