"use client";

export default function SignInButton() {
  return (
    <button
      onClick={() => {
        console.log("Current location href:", window.location.href);
        window.location.href = "/api/login";
      }}
      className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-full transition-colors"
    >
      Login with Spotify
    </button>
  );
}
