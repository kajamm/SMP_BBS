"use client";

import { useState } from "react";
import { sekolah } from "@/data/sekolah";
import { IconWhatsapp } from "./icons";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const waMessage = encodeURIComponent("Assalamualaikum, saya ingin bertanya tentang SMP Plus Babussalam.");

  return (
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 9999 }} className="fade-in-up">
      {/* Popup Box */}
      {isOpen && (
        <div 
          style={{ 
            position: "absolute", 
            bottom: "70px", 
            left: "0", 
            width: "300px", 
            backgroundColor: "white", 
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            overflow: "hidden",
            fontFamily: "var(--font-inter), sans-serif",
            animation: "fadeInUp 0.3s ease",
            border: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: "#85CC3F", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>Customer Service</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: "rgba(0,0,0,0.2)", border: "none", color: "white", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "20px", backgroundColor: "#F7F9FA" }}>
            <div style={{ backgroundColor: "white", padding: "12px 16px", borderRadius: "0 16px 16px 16px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", marginBottom: "16px", position: "relative" }}>
              <div style={{ position: "absolute", top: "0", left: "-8px", width: "0", height: "0", borderTop: "0px solid transparent", borderRight: "10px solid white", borderBottom: "10px solid transparent" }}></div>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#333", lineHeight: 1.5 }}>
                Selamat datang di <strong>{sekolah.namaLengkap}</strong>.
              </p>
            </div>
            <p style={{ margin: "0 0 16px 0", fontSize: "0.9rem", color: "#666" }}>
              Assalamualaikum, ada yang bisa kami bantu?
            </p>

            <a 
              href={`https://wa.me/${sekolah.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backgroundColor: "#85CC3F",
                color: "white",
                textDecoration: "none",
                padding: "12px",
                borderRadius: "99px",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#74b336"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#85CC3F"}
              onClick={() => setIsOpen(false)}
            >
              Mulai Chat
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="wa-float"
        aria-label="Chat WhatsApp"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1) translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(37, 211, 102, 0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 211, 102, 0.4)";
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <IconWhatsapp width={28} height={28} />
        )}
      </button>
    </div>
  );
}
