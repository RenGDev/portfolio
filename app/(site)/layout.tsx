import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/(site)/components/header";

export const metadata: Metadata = {
  title: "Lorenzo Gonçalves - Fullstack Developer",
  description: "Lorenzo Gonçalves is a fullstack developer with experience in building web applications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
      <main className="min-h-full flex flex-col overflow-x-hidden">
        <Header />
        {children}
      </main>
  );
}
