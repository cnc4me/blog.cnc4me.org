import path from "path";

export const HOSTNAME = "";
export const ORG_NAME = "CNC4ME";

export const MY_LINKEDIN_URL = "https://www.linkedin.com/in/kevinkhill/";

export const ORG_GITHUB_URL = `https://github.com/cnc4me/`;

export const BLOG_URL = "https://blog.cnc4me.org/";
export const BLOG_GITHUB_URL = `https://github.com/cnc4me/blog.cnc4me.org/`;

export const PLAYGROUND_URL = `https://playground.cnc4me.org/`;
export const PLAYGROUND_GITHUB_URL = `https://github.com/cnc4me/cnc4me/tree/main/apps/website`;

export const HOME_OG_IMAGE_URL =
  "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";

export const POSTS_DIRECTORY = path.join(process.cwd(), "_posts");

export const FRONT_MATTER_FOR_PAGES = [
  "title",
  "date",
  "slug",
  "author",
  "coverImage",
  "excerpt",
  "tags"
];

export const FRONT_MATTER_FOR_POSTS = [
  "title",
  "date",
  "slug",
  "author",
  "content",
  "ogImage",
  "coverImage",
  "tags"
];
