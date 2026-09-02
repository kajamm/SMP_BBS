"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/auth";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (login(password)) {
        router.replace("/admin");
      } else {
        setError("Password salah. Silakan coba lagi.");
        setLoading(false);
      }
    }, 500);
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
