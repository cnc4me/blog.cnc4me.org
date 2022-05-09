import Link from "next/link";
import React from "react";

import { getAuthor } from "../lib/getAuthor";
import Author from "../types/author";
import PostType from "../types/post";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  date: string;
  slug: string;
  title: string;
  author: PostType["author"];
  excerpt: string;
  coverImage: string;
};

const PostPreview: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => {
  const { name, picture } = getAuthor(author);

  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      <Avatar name={name} picture={picture} />
    </div>
  );
};

export default PostPreview;
