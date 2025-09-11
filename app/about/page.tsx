// app/about/page.tsx
import SEO from "@/components/SEO";

export default function AboutPage() {
  return (
    <>
      {/* 👇 SEO tags */}
      <SEO
        title="About | AI Finance Tools"
        description="AI Finance Tools ek project hai jo AI ke sath integrate kiye gaye finance tools provide karta hai."
        url="https://yourdomain.com/about"
      />

      {/* 👇 UI content */}
      <div className="p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About AI Finance Tools
        </h1>
        <p className="mt-4 text-gray-700">
          Ye project ek set of finance tools provide karta hai jo AI ke sath integrate kiye gaye hain.
        </p>
      </div>
    </>
  );
}
