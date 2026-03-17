import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "@/shared/ui";

export function AuthLayout() {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        <Suspense fallback={<Loader className="h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
