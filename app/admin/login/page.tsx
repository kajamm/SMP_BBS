"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      if (res.ok) {
        localStorage.setItem("smp_bbs_admin_auth", "authenticated");
        router.replace("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Password salah. Silakan coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">BBS</div>
          <h1>Panel Admin</h1>
          <p>SMP Plus Babussalam</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin"
              required
              autoFocus
            />
          </div>

          {error && <div className="admin-alert admin-alert-error">{error}</div>}

          <button type="submit" className="admin-btn admin-btn-primary admin-btn-full" disabled={loading}>
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>

        <a href="/" className="admin-login-back">
          ← Kembali ke Website
        </a>
      </div>
    </div>
  );
}
