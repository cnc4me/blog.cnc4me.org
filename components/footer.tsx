import React from "react";

import { MY_LINKEDIN_URL, ORG_GITHUB_URL } from "../lib/constants";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="border-t border-purple-400 bg-pastel-purple/60">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Created for the benefit of all machinists.
          </h3>
          <div className="flex flex-col items-center justify-center lg:flex-row lg:pl-4 lg:w-1/2">
            <a
              href={ORG_GITHUB_URL}
              className="px-12 py-3 mx-3 mb-6 font-bold text-white transition-colors duration-200 bg-black border border-black hover:bg-white hover:text-black lg:px-8 lg:mb-0"
            >
              Visit us on GitHub
            </a>
            <a
              href={MY_LINKEDIN_URL}
              className="mx-3 font-bold hover:underline"
            >
              Want to Hire Kevin? Visit his LinkedIn!
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
