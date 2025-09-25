import { Metadata } from "next";
import News from "@/components/news";
import SEO from "@/components/SEO";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import DarkModeToggle from "@/components/DarkModeToggle"; // ✅ Dark mode toggle

export const metadata: Metadata = {
  title: "AI Finance Tools - Smarter Financial Decisions",
  description:
    "Free AI powered finance calculators and tools for smarter decision making.",
  openGraph: {
    title: "AI Finance Tools - Smarter Financial Decisions",
    description:
      "Free AI powered finance calculators and tools for smarter decision making.",
    url: "https://yourdomain.com/",
    images: ["/icons/ai-finance.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Tools - Smarter Financial Decisions",
    description:
      "Free AI powered finance calculators and tools for smarter decision making.",
    images: ["/icons/ai-finance.png"],
  },
};

// ✅ async function so we can call backend API
export default async function Home() {
  const posts = getAllPosts();

  // ✅ Absolute URL use karo (server component ke liye zaroori)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let tools: any[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/users`, {
      method: "GET",
      cache: "no-store", // hamesha fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch tools");
    tools = await res.json();
  } catch (err) {
    console.error("❌ Error fetching tools:", err);
  }

  // ✅ JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://yourdomain.com/#organization",
        name: "AI Finance Tools",
        url: "https://yourdomain.com",
        logo: "https://yourdomain.com/icons/ai-finance.png",
        sameAs: [
          "https://twitter.com/yourprofile",
          "https://linkedin.com/in/yourprofile",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://yourdomain.com/#website",
        url: "https://yourdomain.com",
        name: "AI Finance Tools",
        publisher: {
          "@id": "https://yourdomain.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://yourdomain.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://yourdomain.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://yourdomain.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://yourdomain.com/blog",
          },
        ],
      },
    ],
  };

  return (
    <main className="m-0 p-0 bg-background text-foreground transition-colors duration-300">
      {/* ✅ SEO fallback */}
      <SEO
        title="AI Finance Tools - Smarter Financial Decisions"
        description="Free AI powered finance calculators and tools for smarter decision making."
        url="https://yourdomain.com/"
        image="/icons/ai-finance.png"
      />

      {/* ✅ Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Header with Dark Mode Toggle */}
      <header className="flex justify-between items-center p-4 border-b bg-background text-foreground">
        <h1 className="text-xl font-bold">AI Finance Tools</h1>
        <DarkModeToggle />
      </header>

      {/* ✅ Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/icons/finance-bg.jpg"
            alt="Finance Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-800/70 dark:from-black/70 dark:to-gray-900/70"></div>
        </div>

        <div className="relative z-10 text-center px-6 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Smarter Finance with AI Tools
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-100 dark:text-gray-300">
            Calculate, analyze, and explore financial insights with our
            AI-powered tools for smarter decision making.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/tools"
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              🚀 Explore Tools
            </a>
            <a
              href="/about"
              className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ✅ Blog Section */}
      <section className="mt-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border rounded-xl p-4 shadow hover:shadow-lg transition bg-card text-card-foreground"
            >
              <Image
                src={post.frontmatter?.image || "/icons/ai-finance.png"}
                alt={post.frontmatter?.title || "Blog Post"}
                width={400}
                height={250}
                className="w-full h-64 object-cover rounded-lg shadow"
              />
              <h3 className="mt-4 text-xl font-bold">
                {post.frontmatter?.title}
              </h3>
              <p>{post.frontmatter?.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Tools Section (Backend API se fetch kiya gaya)
      <section className="mt-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Popular Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.length > 0 ? (
            tools.map((tool) => (
              <div
                key={tool._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-card text-card-foreground"
              >
                <h3 className="text-xl font-bold">{tool.name}</h3>
                <p>{tool.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground w-full">
              No tools found or failed to fetch data.
            </p>
          )}
        </div>
      </section> */}

      {/* ✅ News Section */}
      <section className="mt-20 px-6 mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Latest News
        </h2>
        <News />
      </section>
    </main>
  );
}
