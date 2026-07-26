export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string[];
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
  content: string;
}

interface RawFrontmatter {
  [key: string]: string;
}

const modules = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  eager: true,
}) as Record<string, { default: string }>;

function parseFrontmatter(raw: string): { frontmatter: RawFrontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }
  const frontmatter: RawFrontmatter = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2].trim() };
}

function parseArrayField(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item));
    }
  } catch {
    return [];
  }
  return [];
}

function stripQuotes(value: string | undefined): string {
  if (!value) return "";
  return value.replace(/^["']|["']$/g, "");
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() || "";
  return filename.replace(/\.md$/, "");
}

const blogPosts: BlogPost[] = Object.entries(modules).map(([path, mod]) => {
  const { frontmatter, body } = parseFrontmatter(mod.default);
  return {
    slug: frontmatter.slug || slugFromPath(path),
    title: stripQuotes(frontmatter.title),
    description: stripQuotes(frontmatter.description),
    category: parseArrayField(frontmatter.category),
    tags: parseArrayField(frontmatter.tags),
    image: stripQuotes(frontmatter.image),
    publishDate: stripQuotes(frontmatter.publishDate),
    readTime: stripQuotes(frontmatter.readTime),
    content: body,
  };
});

const monthOrder: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function dateToTimestamp(dateStr: string): number {
  const parts = dateStr.replace(/,/g, "").split(" ");
  const month = monthOrder[parts[0]] ?? 0;
  const day = parseInt(parts[1] || "1", 10);
  const year = parseInt(parts[2] || "0", 10);
  return new Date(year, month, day).getTime();
}

blogPosts.sort((a, b) => dateToTimestamp(b.publishDate) - dateToTimestamp(a.publishDate));

function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export { blogPosts, getBlogPost };