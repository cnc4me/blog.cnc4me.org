import Link from "next/link";
import React from "react";

import postStyles from "./styles/posts.module.css";

type Props = {
  tags: string[];
};

const PostFooter: React.FC<Props> = ({ tags }) => {
  return (
    <div className={postStyles["footerContainer"]}>
      {tags.map(tag => {
        return (
          <Link key={tag} href={`/tags/${tag}`}>
            <a>#{tag}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default PostFooter;
