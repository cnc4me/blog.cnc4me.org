import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const PostTags = ({ tags }: Props) => {
  tags = [];

  return (
    <>
      {tags.length > 0 && (
        <div className="flex justify-end pr-2">
          <span className="pb-3 pr-2">Tags:</span>
          {tags.map(tag => {
            return (
              <span className="pb-3 pr-2" key={tag}>
                <Link href={`/tags/${tag}`}>
                  <a className="underline transition-colors duration-200 hover:text-blue-600">
                    #{tag}
                  </a>
                </Link>
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PostTags;
