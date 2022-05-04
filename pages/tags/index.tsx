import Head from "next/head";
import Link from "next/link";
import React from "react";

import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllTags } from "../../lib/api";
import { ORG_NAME } from "../../lib/constants";

type Props = {
  allTags: string[];
};

const Index = ({ allTags }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{ORG_NAME} | Tags</title>
        </Head>
        <Container>
          {allTags.map(tag => {
            return (
              <h1 key={tag} className="leading-3">
                <Link href={`/tags/${tag}`}>{tag}</Link>
              </h1>
            );
          })}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allTags = getAllTags();

  return {
    props: { allTags }
  };
};
