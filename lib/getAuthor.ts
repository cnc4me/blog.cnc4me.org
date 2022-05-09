import Author from "../types/author";

const AuthorMap: Record<string, Author> = {
  "@kevin": {
    name: "Kevin Hill",
    picture: "/assets/blog/kh.jpg"
  },
  UNKOWN: {
    name: "who knows?",
    picture: "qweddftyhbgyuioiuy654edfghj"
  }
};

export const isValidAuthor = (authorTag: string) =>
  Object.keys(AuthorMap).includes(authorTag);

export function getAuthor(tagOrAuthor: string | Author): Author {
  if (typeof tagOrAuthor === "string") {
    return isValidAuthor(tagOrAuthor)
      ? AuthorMap[tagOrAuthor]
      : AuthorMap.UNKOWN;
  } else {
    return tagOrAuthor;
  }
}
