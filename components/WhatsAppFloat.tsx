"use client";

import { sekolah } from "@/data/sekolah";
import { IconWhatsapp } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${sekolah.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float fade-in-up"
      aria-label="Chat WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        width: "48px",
        height: "48px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4)",
        zIndex: 9999,
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
      <IconWhatsapp width={28} height={28} />
    </a>
  );
}
