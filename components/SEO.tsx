"use client";

import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  isBlogPost?: boolean;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export default function SEO({
  title = "AI Finance Tools",
  description = "AI powered finance tools for smarter decision making.",
  url = "https://yourdomain.com/",
  image = "/icons/ai-finance.png",
  isBlogPost = false,
  datePublished,
  dateModified,
  authorName = "AI Finance Tools",
}: SEOProps) {
  const siteName = "AI Finance Tools";

  // ✅ JSON-LD Structured Data
  const jsonLd = isBlogPost
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: [image],
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: "https://yourdomain.com/icons/ai-finance.png",
          },
        },
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || new Date().toISOString(),
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url,
        description,
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: "https://yourdomain.com/icons/ai-finance.png",
          },
        },
      };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isBlogPost ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ JSON-LD Inject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
