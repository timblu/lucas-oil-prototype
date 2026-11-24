import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/auth/AuthContext";
import { router } from "./app/router";
import "./styles/index.css";

/** Flip to false to restore the app. Content is untouched. */
const APP_OFFLINE = true;

createRoot(document.getElementById("root")!).render(
  APP_OFFLINE ? (
    <div style={{ minHeight: "100vh", background: "#fff" }} />
  ) : (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  ),
);
