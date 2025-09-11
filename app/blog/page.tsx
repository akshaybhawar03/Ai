import Link from "next/link";
import { getAllPosts } from "@/lib/getPost";
import SEO from "@/components/SEO"; // ✅ tumhara SEO component use kiya

export default async function BlogList() {
  // ✅ sabhi blogs fetch karo
  const posts = await getAllPosts();

  // ✅ JSON-LD (Blog list schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AI Finance Blog",
    description:
      "Latest articles on AI-powered finance tools, calculators, and smart money management.",
    url: "https://yourdomain.com/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      image: post.frontmatter.image || "/icons/ai-finance.png",
      author: {
        "@type": "Person",
        name: post.frontmatter.author || "AI Finance Tools",
      },
      datePublished: post.frontmatter.date,
      dateModified: post.frontmatter.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://yourdomain.com/blog/${post.slug}`,
      },
    })),
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* ✅ SEO fallback */}
      <SEO
        title="AI Finance Blog - Latest Articles & Insights"
        description="Read the latest blogs on AI-powered finance tools, calculators, and smart decision-making."
        url="https://yourdomain.com/blog"
        image="/icons/ai-finance.png"
      />

      {/* ✅ Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-6">📚 AI Finance Blog</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 bg-white"
          >
            {/* Blog Image */}
            {post.frontmatter.image && (
              <img
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            {/* Blog Title */}
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.frontmatter.title}
              </Link>
            </h2>

            {/* Blog Description */}
            <p className="text-gray-600 mb-3">
              {post.frontmatter.description}
            </p>

            {/* Read More */}
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
