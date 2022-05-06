import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className="container px-5 mx-auto">{children}</div>;
};

export default Container;
