"use client";
// app/admin/login/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid credentials. Please try again.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080E18] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D92626]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0D1624] border border-[#1E2B3E] rounded-2xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4 overflow-hidden rounded-xl bg-white/5 border border-white/10 p-2 shadow-inner">
            <Image
              src="/bht-flower-icon.png"
              alt="B.H.T. Collections Logo"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 text-[#E6C687] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#D4AF37]/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Single Admin Portal</span>
          </div>
          <h1
            className="text-2xl font-bold text-white tracking-wide"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
          >
            B.H.T. Collections
          </h1>
          <p className="text-xs text-[#8A95A5] mt-1">
            Enter authorized single-admin credentials
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-[#D92626]/15 border border-[#D92626]/40 rounded-xl flex items-start gap-2.5 text-xs text-[#FF8080]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#B0BAC9] mb-1.5 tracking-wider uppercase">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blankethouse.ae"
                className="w-full bg-[#080E18] border border-[#1E2B3E] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#4A5568] transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#B0BAC9] mb-1.5 tracking-wider uppercase">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#080E18] border border-[#1E2B3E] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#4A5568] transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#D92626] to-[#B31E1E] hover:from-[#E63939] hover:to-[#C42424] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-red-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#1E2B3E] text-center text-[11px] text-[#64748B]">
          Blanket House Trading L.L.C. · Dubai, UAE
        </div>
      </div>
    </div>
  );
}
