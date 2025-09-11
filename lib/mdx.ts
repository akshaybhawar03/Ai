import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentPath = path.join(process.cwd(), "content", "blog");

export function getAllPosts() {
  const files = fs.readdirSync(contentPath);

  return files.map((file) => {
    const source = fs.readFileSync(path.join(contentPath, file), "utf8");
    const { data } = matter(source);

    return {
      slug: file.replace(/\.mdx?$/, ""),
      frontmatter: {
        title: data.title,
        description: data.description,
        image: data.image || null,
        author: data.author || "Akshay", // ✅ default author
        date: data.date || null,
      },
    };
  });
}

export function getPost(slug: string) {
  const fullPath = path.join(contentPath, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(source);

  return {
    slug,
    frontmatter: {
      title: data.title,
      description: data.description,
      image: data.image || null,
      author: data.author || "Akshay",
      date: data.date || null,
    },
    content,
  };
}
