import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import PostType from "../types/post";
import { FRONT_MATTER_FOR_POSTS, POSTS_DIRECTORY } from "./constants";

interface RepoConfig {
  rootDir: string;
}

function stripExtension(slug: string): string | undefined {
  return slug.replace(/\.md$/, "");
}

export class PostRepository {
  private rootDir = POSTS_DIRECTORY;

  get slugs(): string[] {
    return this.getPostSlugs();
  }

  get tags(): string[] {
    return this.getAllTags();
  }

  get posts(): PostType[] {
    return this.getAllPosts();
  }

  static fromRoot(rootDir: string): PostRepository {
    return new PostRepository({ rootDir });
  }

  constructor({ rootDir }: RepoConfig) {
    this.rootDir = rootDir;
  }

  getPostSlugs(): string[] {
    return fs.readdirSync(this.rootDir);
  }

  getFullPathBySlug(slug: string): string {
    return join(this.rootDir, `${stripExtension(slug)}.md`);
  }

  getPostBySlug(slug: string, fields = FRONT_MATTER_FOR_POSTS): PostType {
    const fullPath = this.getFullPathBySlug(slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    // console.log(data);

    const items: Partial<PostType> & Record<string, string> = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach(field => {
      if (field === "slug") {
        items[field] = stripExtension(slug);
      }

      if (field === "content") {
        items[field] = content;
      }

      if (typeof data[field] !== "undefined") {
        items[field] = data[field];
      }
    });

    return items as PostType;
  }

  getAllPosts(fields?: string[]): PostType[] {
    const posts = this.slugs
      .map(slug => this.getPostBySlug(slug, fields ?? FRONT_MATTER_FOR_POSTS))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

    return posts;
  }

  getAllTags(): string[] {
    const tags = new Set<string>();

    this.posts.forEach(post => {
      post?.tags?.forEach(tag => tags.add(tag));
    });

    return Array.from(tags);
  }
}

export const postRepo = PostRepository.fromRoot(POSTS_DIRECTORY);
