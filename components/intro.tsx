import React from "react";

import { ORG_NAME, PLAYGROUND_URL } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
      <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl md:pr-8">
        {ORG_NAME} Blog
      </h1>
      <h4 className="mt-5 text-lg text-center md:text-left md:pl-40">
        Excerpts from the development of the virtual{" "}
        <a
          href="https://github.com/cnc4me/cnc4me/tree/main/packages/fanuc-macro-b"
          className="underline transition-colors duration-200 hover:text-blue-600"
        >
          Fanuc Macro B
        </a>{" "}
        runtime and the accompanying{" "}
        <a
          href={PLAYGROUND_URL}
          className="underline transition-colors duration-200 hover:text-blue-600"
        >
          Macro Playground
        </a>{" "}
        website.
      </h4>
    </section>
  );
};

const Intro2 = () => {
  return (
    <section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
      <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl md:pr-8">
        {ORG_NAME} Blog
      </h1>
      <h4 className="mt-5 text-lg text-center md:text-left md:pl-40">
        Small excerpts about programming, whether the development of the{" "}
        <a
          href={PLAYGROUND_URL}
          className="underline transition-colors duration-200 hover:text-blue-600"
        >
          Macro Playground
        </a>{" "}
        or sharing expert knowledge from the shop.
      </h4>
    </section>
  );
};

export default Intro2;
