import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
      Loading…
    </div>
  );
}

export function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={<PageLoadingFallback />}>
        <Outlet />
      </Suspense>
    </>
  );
}
