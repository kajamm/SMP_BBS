"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        onChange(data.url);
      } else {
        alert("Gagal upload gambar: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="https://... atau upload file"
          style={{ 
            flex: 1, 
            padding: "10px 14px", 
            borderRadius: "10px", 
            border: "1px solid #d1d5db",
            outline: "none"
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "none" }}
          id="file-upload-input"
        />
        <label 
          htmlFor="file-upload-input"
          className="admin-btn admin-btn-secondary"
          style={{ 
            cursor: uploading ? "not-allowed" : "pointer", 
            opacity: uploading ? 0.7 : 1,
            margin: 0,
            whiteSpace: "nowrap"
          }}
        >
          {uploading ? "⏳ Uploading..." : "📁 Pilih File"}
        </label>
      </div>
      {value && <img src={value} alt="Preview" className="admin-img-preview" style={{ maxWidth: "200px", borderRadius: "8px", border: "1px solid #e5e7eb" }} />}
    </div>
  );
}
