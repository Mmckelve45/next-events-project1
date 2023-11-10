import Layout from "@/components/layout/layout";
import Head from "next/head";
import "@/styles/globals.css";
import { Fragment } from "react";

//Application shell.  Root component inside the body
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
