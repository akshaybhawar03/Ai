import { getPost, getAllSlugs } from "@/lib/getPost";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Blog fetch (await lagana zaroori hai)
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>

      {/* Image */}
      {post.frontmatter.image && (
        <img
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          className="rounded-lg mb-6"
        />
      )}

      {/* Content */}
      <div>{post.content}</div>
    </article>
  );
}

// ✅ Generate static params for SSG
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}
