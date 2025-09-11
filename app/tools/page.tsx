"use client";

import { useState } from "react";
import Link from "next/link";
import SEO from "@/components/SEO"; // ✅ tumhare SEO component ko use kiya

const toolsList = [
  {
    id: 1,
    title: "Forex Lot Size Calculator",
    description: "Calculate the correct lot size for your forex trades.",
    slug: "forex-lot-size",
    icon: "📊",
  },
  {
    id: 2,
    title: "SIP Calculator",
    description: "Estimate your mutual fund SIP returns.",
    slug: "sip-calculator",
    icon: "🧮",
  },
  {
    id: 3,
    title: "Currency Converter",
    description: "Convert between different world currencies.",
    slug: "currency-converter",
    icon: "💱",
  },
  {
    id: 4,
    title: "Loan EMI Calculator",
    description: "Calculate your loan EMI easily.",
    slug: "loan-emi-calculator",
    icon: "🏦",
  },
  {
    id: 5,
    title: "AI Resume Builder",
    description: "Generate a professional resume summary with AI.",
    slug: "resume-builder",
    icon: "📝",
  },
];

export default function ToolsPage() {
  const [tools] = useState(toolsList);

  // ✅ JSON-LD (ItemList schema for SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Finance Tools",
    description:
      "Free AI-powered financial calculators and tools like SIP Calculator, Loan EMI, Currency Converter, Resume Builder, and more.",
    url: "https://yourdomain.com/tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://yourdomain.com/tools/${tool.slug}`,
      name: tool.title,
      description: tool.description,
    })),
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* ✅ SEO Fallback */}
      <SEO
        title="AI Finance Tools - Free Online Calculators"
        description="Free AI-powered finance calculators like SIP Calculator, Loan EMI, Currency Converter, and more."
        url="https://yourdomain.com/tools"
        image="/icons/ai-finance.png"
      />

      {/* ✅ Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Tools Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            href={`/tools/${tool.slug}`}
            key={tool.id}
            className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-4xl">{tool.icon}</div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
