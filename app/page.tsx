import SignInButton from "@/components/SignInButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("spotify_token");
  if (token) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">replayfm</h1>
        <p className="text-neutral-500 mb-8">your personal spotify wrapped</p>
        <SignInButton />
      </div>
    </main>
  );
}
