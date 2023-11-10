import EventList from "@/components/events/event-list";
// import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-util";
import React, { Fragment } from "react";
import EventsSearch from "./events-search";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  // const events = getAllEvents();
  const { events } = props;
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          // This shows up in a search result on google search engine
          content="Find a lot of great events"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
