import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import PostType from "../types/post";
import { POSTS_DIRECTORY } from "./constants";

export function getPostSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY);
}

export function getPostBySlug(slug: string, fields: string[] = []): PostType {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(POSTS_DIRECTORY, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Partial<PostType> & Record<string, string> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  console.log(items);
  return items as PostType;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  console.log(slugs);

  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  console.log(posts);
  return posts;
}

export function getAllTags() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post?.tags?.forEach(tag => tags.add(tag));
  });

  return Array.from(tags);
}
