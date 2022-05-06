import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const PostFooter: React.FC<Props> = ({ tags }) => {
  return (
    <div className="flex justify-center gap-2 py-4 align-middle bg-purple-200 border-t shadow-xl border-t-purple-300 rounded-b-md">
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

export default PostFooter;
