import React from "react";

import { ORG_NAME, PLAYGROUND_URL } from "../lib/constants";

const Intro2 = () => {
  return (
    <section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
      <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl md:pr-8">
        {ORG_NAME} Blog
      </h1>
      <h4 className="mt-5 text-lg text-center md:text-left md:pl-40">
        Small stories about Programming, The{" "}
        <a
          href={PLAYGROUND_URL}
          className="underline transition-colors duration-200 hover:text-blue-600"
        >
          Fanuc Macro Playground
        </a>
        , and Bits of Knowledge from the Shop.
      </h4>
    </section>
  );
};

export default Intro2;
