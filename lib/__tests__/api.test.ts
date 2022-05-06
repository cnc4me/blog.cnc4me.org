import { join } from "path";

import { PostRepository } from "../api";

const repo = PostRepository.fromRoot(join(__dirname, "__posts__"));

describe("Testing the PostRepository class", () => {
  describe("getPostSlugs", () => {
    it("returns an array of filenames", () => {
      expect(repo.slugs.length).toEqual(2);
    });
  });

  describe("getPostBySlug", () => {
    it(`should return the post from the slug "post-for-test.md"`, () => {
      const post = repo.getPostBySlug("post-for-test.md");

      expect(post.tags).toEqual(["vba", "excel", "automation"]);
    });

    it(`should return the post from the slug "other-post-for-test.md"`, () => {
      const post = repo.getPostBySlug("other-post-for-test.md");

      expect(post.tags).toEqual(["typescript", "cli", "automation"]);
    });
  });

  describe("getAllPosts", () => {
    it("should return all the posts", () => {
      expect(repo.posts.length).toEqual(2);
    });
  });

  describe("getAllTags", () => {
    it("should return an array of tag names extracted from posts", () => {
      expect(repo.tags.length).toBeGreaterThan(0);
    });
  });
});
