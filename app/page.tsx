"use client";
import InteractiveBackground from "@/components/Bg";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (<>
    <InteractiveBackground>
      <Navbar />

      <main className="px-10 py-20">
        <h1 className="text-5xl font-bold text-slate-900">
          Your Health, Our Priority
        </h1>

        <p className="mt-4 text-slate-600">
          Quality healthcare with compassion and technology.
        </p>
      </main>
    </InteractiveBackground>
      <Footer />  </>
  );
}