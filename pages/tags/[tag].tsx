import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllTags } from "../../lib/api";
import { ORG_NAME } from "../../lib/constants";

type Props = {
  tag: string;
  preview?: boolean;
};

const Tag = ({ tag, preview }: Props) => {
  const router = useRouter();

  if (!router.isFallback && !tag) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {ORG_NAME} | Tags | {tag}
                </title>
              </Head>
              <div className="text-xl">{tag}</div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Tag;

type Params = {
  params: {
    tag: string;
  };
};

export async function getStaticProps({ params }: Params) {
  return {
    props: {
      tag: params.tag
    }
  };
}

export async function getStaticPaths() {
  const tags = getAllTags();
  // const tags = ["excel"];

  return {
    paths: tags.map(tag => {
      return {
        params: {
          tag
        }
      };
    }),
    fallback: true // false or 'blocking'
  };
}
