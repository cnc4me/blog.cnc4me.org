import React from "react";

import markdownStyles from "./markdown-styles.module.css";
import PostFooter from "./post-footer";

type Props = {
  tags: string[];
  content: string;
};

const PostBody = ({ content, tags }: Props) => {
  return (
    <div className="max-w-3xl mx-auto rounded-b-md bg-purple-50">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <PostFooter tags={tags ?? []} />
    </div>
  );
};

export default PostBody;
