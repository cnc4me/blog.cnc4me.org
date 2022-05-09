---
title: String Compression and URL Encoding
excerpt: ummmm
date: "2022-05-08T13:00:00.0Z"
author:
  name: Kevin Hill
  picture: "/assets/blog/kh.jpg"
coverImage: "/assets/blog/string-compression/cover.jpg"
ogImage:
  url: "/assets/blog/string-compression/cover.jpg"
tags:
 - typescript
 - react
 - compress
 - encode
---
## String Compression and URL Encoding

While learning TypeScript, I frequently use the amazing [playground webapp](https://www.typescriptlang.org/play) they made available to developers. It has proven invaluable to developers to be able to send examples or issues directly to collegues via a single URL. You [can save links to content you create](https://www.typescriptlang.org/play?#code/PQKhFgCgAIWgVAFgSwM7TdAxgewLYAOATgKaqokAm0AhgHbUl26VUZ0AuO0HiJ0AVQBKAGR7cARvxoSANvy7Qp0VIhqlKAOiixgQA) with no strings attached. You don't have to register or log-in, no downloads, it's free to share! I really like this concept, so I decided that I was going to see if I could implement it for [my playground](https://playground.cnc4me.org/).

### Step 1 - Figure out how they do it

Here is [the link we will be examining](https://www.typescriptlang.org/play?#code/PQKhFgCgAIWgVAFgSwM7TdAxgewLYAOATgKaqokAm0AhgHbUl26VUZ0AuO0HiJ0AVQBKAGR7cARvxoSANvy7Qp0VIhqlKAOiixgQA).

Ignoring the domain, we start from `/play` which is the route they have given to this app, don't need that, moving on. `#code/` is next which is the hash key they are using to store the editor content. After the final `/` is

`PQKhFgCgAIWgVAFgSwM7TdAxgewLYAOATgKaqokAm0AhgHbUl26VUZ0AuO0HiJ0AVQBKAGR7cARvxoSANvy7Qp0VIhqlKAOiixgQA`

which is some sort of hashing or encoding of our input, since it is definitely __not the source__.

### Step 2 - Investigating

I need to see the source, I need to know, and I am happy to be an open source developer and part of a movement towards open source. This means the the TypeScript playgrounds' [source is available](https://github.com/microsoft/TypeScript-Website) for me to take a look. I find that [the syntax for links](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/playground#link-syntax) is well documented, so we are on the right track. I am not sure where this file and method might be, so lets use Github's search. Since they are using `#code/` in the URL, we will search for ["hash"](https://github.com/search?q=hash+repo%3Amicrosoft%2FTypeScript-Website&type=Code) in the repository for usage of `location.hash`. Our search ends [here](https://github.com/microsoft/TypeScript-Website/blob/6cc9d3087e5161adc9a0aaef4a2ca18d431501c0/packages/sandbox/src/getInitialCode.ts#L17) with the code for how they are decoding that wacky URL. Some library called __lzstring__

### Step 3 - Research

Since this is a webapp, our first logical search will be on NPM and it brings up the package [lz-string](https://www.npmjs.com/package/lz-string) by [pieroxy](http://pieroxy.net/blog/pages/lz-string/index.html). So here we have it, they are taking the contents of the editor, running through this compression library, and appending it to the URL. I thought this might be complicated, but it seems pretty straight forward. I just need to make a similiar implementation for my site, using this library.

