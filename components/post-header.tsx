import React from "react";

import { getAuthor } from "../lib/getAuthor";
import PostType from "../types/post";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import postStyles from "./styles/posts.module.css";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: PostType["author"];
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  const { name, picture } = getAuthor(author);
  const avatar = <Avatar name={name} picture={picture} />;

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">{avatar}</div>
      <div className="flex justify-center mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="block mb-6 md:hidden">{avatar}</div>
        <div className={postStyles["dateFormatter"]}>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
