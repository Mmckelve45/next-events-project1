import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-util";
import React from "react";
import Head from "next/head";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          // This shows up in a search result on google search engine
          content="Find a lot of great events"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await getFeaturedEvents();
  return {
    props: {
      events: data,
    },
    // Every half hour regenerate for new incoming request.
    revalidate: 1800,
  };
}

export default HomePage;
