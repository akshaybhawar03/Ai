"use client";
import { useEffect } from "react";

export default function ServiceWorkerProvider() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("✅ Service Worker registered:", reg))
        .catch((err) => console.error("❌ Service Worker failed:", err));
    }
  }, []);

  return null; // यह UI render नहीं करेगा, बस background में SW register करेगा
}
