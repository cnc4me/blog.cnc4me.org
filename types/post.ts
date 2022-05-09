import type Author from "./author";

type PostType = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  coverImage: string;
  author: string | Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export default PostType;
