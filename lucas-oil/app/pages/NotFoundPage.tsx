import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="text-sm text-muted-foreground max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to={ROUTES.dashboard}
        className="mt-2 text-sm font-medium text-[#111] hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
