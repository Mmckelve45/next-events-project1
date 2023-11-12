import Layout from "@/components/layout/layout";
import Head from "next/head";
import "@/styles/globals.css";
import { Fragment } from "react";
import { NotificationContextProvider } from "@/store/notification-context";

//Application shell.  Root component inside the body
export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta
            name="description"
            content="NextJS Events"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
