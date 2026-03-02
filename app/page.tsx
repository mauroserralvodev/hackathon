// app/page.tsx
import LoginPanel from "@/components/auth/LoginPanel";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        
        {/* Left - Image */}
        <section className="relative hidden lg:block">
          <Image
            src="/fest.jpg"
            alt="Festival background"
            fill
            priority
            className="object-cover opacity-65"
          />
        </section>

        {/* Right - Login */}
        <section className="flex items-center justify-center px-6 py-10 bg-white">
          <LoginPanel />
        </section>

      </div>
    </main>
  );
}