import React from "react";

import { ORG_NAME, PLAYGROUND_URL } from "../lib/constants";

const Intro2 = () => {
  return (
    <section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
      <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl md:pr-8">
        {ORG_NAME} Blog
      </h1>
      <h4 className="px-3 py-1 mt-5 text-lg font-bold text-center rounded-md shadow-lg bg-purple-50/20 md:text-left md:ml-40">
        Tales from the shop, developing the{" "}
        <a
          href={PLAYGROUND_URL}
          className="underline transition-colors duration-200 hover:text-blue-600"
        >
          Macro Playground
        </a>
        , and other insights from the Programmer / Machinist.
      </h4>
    </section>
  );
};

export default Intro2;
