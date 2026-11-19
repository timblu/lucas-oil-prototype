import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/auth/AuthContext";
import { BrandProvider } from "./app/brand/BrandContext";
import { router } from "./app/router";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrandProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </BrandProvider>,
);
