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

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      console.log(field, data[field]);

      items[field] = data[field];
    }
  });

  return items as unknown as PostType;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

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
