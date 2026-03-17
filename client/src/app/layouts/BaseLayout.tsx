import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/layouts/Footer";
import { Navbar } from "@/layouts/Navbar";
import { Loader } from "@/shared/ui";

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-67px)]">
        <Suspense fallback={<Loader className="h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
