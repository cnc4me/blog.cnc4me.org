import { getPostSlugs } from "../api";

describe("Testing the blog API functions", () => {
  describe("getPostSlugs", () => { 
    it("returns an array of filenames", () => { 
      const slugs = getPostSlugs();

      expect(Array.isArray(slugs)).toBeTruthy();
      expect(slugs.length).toBeGreaterThan(0);
    })
  });
 });

