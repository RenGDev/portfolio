import type { Metadata } from "next";
import "@/app/globals.css";
import SideBar from "@/app/manager/components/sidebar";

export const metadata: Metadata = {
  title: "Content Manager",
  description: "Lorenzo Gonçalves is a fullstack developer with experience in building web applications.",
};

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          { children }
        </main>
    </div>
  );
}