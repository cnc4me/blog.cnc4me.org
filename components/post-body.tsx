import React from "react";

import PostFooter from "./post-footer";
import markdownStyles from "./styles/markdown.module.css";
import postStyles from "./styles/posts.module.css";

type Props = {
  tags: string[];
  content: string;
};

const PostBody: React.FC<Props> = ({ content, tags }) => {
  return (
    <div className={postStyles["bodyContainer"]}>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <PostFooter tags={tags ?? []} />
    </div>
  );
};

export default PostBody;
