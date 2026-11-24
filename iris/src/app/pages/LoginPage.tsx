import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { brand } from "../brand/brand";
import { BrandLogo } from "../components/shared/BrandLogo";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ROUTES } from "../routes";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to={ROUTES.dashboard} replace />;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      navigate(ROUTES.dashboard);
    }, 900);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-xl bg-white px-5 py-4">
            <BrandLogo height={40} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Distributor Portal
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold text-heading">
              Partner sign in
            </CardTitle>
            <CardDescription>
              Use your distributor credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@distributor.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full"
                disabled={loading || !email.trim() || !password.trim()}
              >
                {loading ? <Loader2 className="animate-spin" /> : null}
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t pt-6 text-xs text-muted-foreground">
            Need access? Contact your {brand.name} rep.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
