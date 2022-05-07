import { join } from "path";
import { cwd } from "process";

export const HOSTNAME = "";

export const ORG_NAME = "CNC4ME";

export const HOME_OG_IMAGE_URL =
  "https://media.istockphoto.com/photos/machine-drill-picture-id680194864?k=6&m=680194864&s=170667a&w=0&h=KARppQTEmlN2gp4HmGeMOSHf49jqYUa-U0uWUtk1ke0=";

export const MY_LINKEDIN_URL = "https://www.linkedin.com/in/kevinkhill/";

export const ORG_GITHUB_URL = `https://github.com/cnc4me/`;

export const BLOG_URL = "https://blog.cnc4me.org/";

export const BLOG_GITHUB_URL = `https://github.com/cnc4me/blog.cnc4me.org/`;

export const PLAYGROUND_URL = `https://playground.cnc4me.org/`;

export const PLAYGROUND_GITHUB_URL = `https://github.com/cnc4me/cnc4me/tree/main/apps/website`;

export const POSTS_DIRECTORY = join(cwd(), "_posts");

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
