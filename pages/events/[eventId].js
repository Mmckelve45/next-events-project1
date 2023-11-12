import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import ErrorAlert from "@/components/ui/error-alert";
// import { getEventById } from "@/dummy-data";
import {
  getAllEvents,
  getEventById,
} from "@/helpers/api-util";
import Head from "next/head";
// import { useRouter } from "next/router";
import React, { Fragment } from "react";

function EventDetailPage(props) {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.event;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          // This shows up in a search result on google search engine
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // Could be inefficient to reload All the events
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    // If we specify all possible paths we can false. If unknown ID, show 404 page
    // If we need to dynamically generate on the fly this needs to be true.
    // If true, we should show a loading/error state in function component page.
    // If fallback is blocking, we don't navigate until it's loaded.
    fallback: false,
  };
}

export default EventDetailPage;
