import "./index.css";

import { StrictMode, Suspense } from "react";

import { AppContextProvider } from "./context";
import ErrorBoundary from "./components/ErrorUI/ErrorBoundary";
import LoadingFallback from "./components/ui/LoadingFallback";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "@/routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary>
        <AppContextProvider>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </AppContextProvider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
);
