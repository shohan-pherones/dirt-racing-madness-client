"use client";

import { EventCard } from "@/components/blocks";
import { Error, Loading, SectionTitle } from "@/components/elements";
import { useEvents } from "@/hooks/useEvents";

const EventsPage = () => {
  const { data, loading, error } = useEvents();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <main className="min-h-screen">
      <section className="container py-10 md:py-20">
        <SectionTitle>Events: {data?.events.length}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10">
          {data?.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
