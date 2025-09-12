// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // ✅ Live domain env se lo, fallback only for local dev
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://ai-itnqc8me8-akshays-projects-da0e0611.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // ✅ Google & all crawlers allowed
        disallow: ["/private/", "/api/"], // ✅ sensitive routes disallowed
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl, // 👈 Added host directive for better SEO
  };
}
