import Link from "next/link";
import React from "react";

import markdownStyles from "./markdown-styles.module.css";

type Props = {
  tags: string[];
  content: string;
};

const PostBody = ({ content, tags }: Props) => {
  tags = [];

  return (
    <div className="max-w-2xl mx-auto rounded-b-md bg-purple-50">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {tags.length > 0 && (
        <div className="flex justify-end pr-2">
          <span className="pb-3 pr-2">Tags:</span>
          {tags.map(tag => {
            return (
              <span className="pb-3 pr-2" key={tag}>
                <a
                  className="underline transition-colors duration-200 hover:text-blue-600"
                  href={`/tags/${tag}`}
                >
                  #{tag}
                </a>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostBody;
