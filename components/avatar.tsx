/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture} alt={name} className="w-12 h-12 mr-4 rounded-full" />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
