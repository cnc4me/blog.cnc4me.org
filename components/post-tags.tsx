import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const PostTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className="flex justify-center gap-2 pb-5">
      {tags.map(tag => {
        return (
          <span className="pr-3" key={tag}>
            <Link href={`/tags/${tag}`}>
              <a className="font-bold uppercase transition-colors duration-200 hover:text-violet-600">
                #{tag}
              </a>
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default PostTags;
