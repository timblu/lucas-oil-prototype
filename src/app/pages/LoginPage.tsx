import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LucasOilLogo } from "../components/shared/LucasOilLogo";
import { useAuth } from "../auth/AuthContext";
import { ROUTES } from "../routes";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@lucasoil.com");
  const [password, setPassword] = useState("lucas2026");
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
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <LucasOilLogo height={48} />
          </div>
          <p className="text-[#888] text-sm tracking-wide uppercase">
            Distributor Portal
          </p>
        </div>

        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-8">
          <h2 className="text-[#111] text-lg font-semibold mb-6">
            Partner Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => {
                  if (!email) setEmail("demo@lucasoil.com");
                }}
                placeholder="you@distributor.com"
                className="w-full bg-[#EBEBEB] border border-[rgba(0,0,0,0.1)] rounded-lg px-3.5 py-2.5 text-[#111] placeholder-[#aaa] text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 transition"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#888]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#555] hover:text-[#111] underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => {
                  if (!password) setPassword("lucas2026");
                }}
                placeholder="••••••••"
                className="w-full bg-[#EBEBEB] border border-[rgba(0,0,0,0.1)] rounded-lg px-3.5 py-2.5 text-[#111] placeholder-[#aaa] text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-50 text-primary-foreground font-semibold py-2.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#aaa] text-xs mt-5 leading-relaxed">
          Need access?{" "}
          <span className="text-[#777]">Contact your Lucas Oil rep.</span>
        </p>
      </div>
    </div>
  );
}
