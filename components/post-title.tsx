import React, { ReactNode } from "react";

import postStyles from "./styles/posts.module.css";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return <h1 className={postStyles["title"]}>{children}</h1>;
};

export default PostTitle;
