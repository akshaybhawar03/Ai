import { getPost } from "@/lib/getPost";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>; // <-- yaha Promise add karo
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params; // <-- params ko await karna hoga

  // Blog fetch
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
