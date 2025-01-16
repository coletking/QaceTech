"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "../../utils/storage";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
     const email =  localStorage.getItem("email")
      setUser(email)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setUser(null);
  };

  console.log(user)
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg1.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-full text-center bg-[#0a0a0a61]">
        <h1 className="text-4xl font-bold text-white mb-4">
          {user ? `Hi, ${user}, Thanks for trying this test application. Hope to hear from you soon.` : "Welcome to kingsley julius test app with test automation setup (Playwright)"}
        </h1>
        {!user ? (
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
