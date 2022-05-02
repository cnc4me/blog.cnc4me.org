import cn from "classnames";
import React from "react";

import { BLOG_GITHUB_URL } from "../lib/constants";
import Container from "./container";

type Props = {
  preview?: boolean;
};

const EmptyAlert = <></>;

const SourceAvailable = (
  <>
    The source code for this blog is{" "}
    <a
      href={BLOG_GITHUB_URL}
      className="underline transition-colors duration-200 hover:text-violet-700"
    >
      available on GitHub
    </a>
    .
  </>
);

const PreviewMode = (
  <>
    This page is a preview.{" "}
    <a
      href="/api/exit-preview"
      className="underline transition-colors duration-200 hover:text-teal-300"
    >
      Click here
    </a>{" "}
    to exit preview mode.
  </>
);

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "bg-neutral-800 border-neutral-800 text-white": preview,
        "bg-fuchsia-900/50 border-fuchsia-800": !preview
      })}
    >
      <Container>
        <div className="py-2 text-sm text-center">
          {preview ? PreviewMode : EmptyAlert}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
