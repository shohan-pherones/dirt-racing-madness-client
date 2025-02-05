"use client";

import { Error, Loading, SectionTitle } from "@/components/elements";
import { cn } from "@/lib/utils";
import { useEventQuery } from "@/types/generated/graphql";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = use(params);
  const { data, loading, error } = useEventQuery({
    variables: { id: eventId },
  });
  const router = useRouter();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!data?.event.id) return notFound();

  const handleRegisterEntry = () => {};

  return (
    <section className="container py-10 md:py-20 flex flex-col gap-5 md:gap-10">
      <figure className="max-h-[50vh] aspect-square rounded-xl overflow-hidden">
        <Image
          src={data.event.imageUrl || "/images/placeholder.png"}
          alt={data.event.name}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col gap-2.5 md:gap-5">
        <div>
          <span
            className={cn(
              "badge",
              data.event.status === "UPCOMING" && "badge-secondary",
              data.event.status === "RUNNING" && "badge-accent",
              data.event.status === "PAST" && "badge-error"
            )}
          >
            {data.event.status}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            {data.event.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex flex-col gap-2.5 md:gap-5">
            <div>
              <SectionTitle margin={false}>Description</SectionTitle>
              <p>{data.event.description}</p>
            </div>
            <ul>
              <li>
                <b>Date:</b>{" "}
                {format(data.event.dateTime, "dd-MM-yyyy 'at' hh:mm a")}
              </li>
              <li>
                <b>Location:</b> {data.event.location}
              </li>
              <li>
                <b>Available Entries:</b> {data.event.capacity}
              </li>
            </ul>
            <div className="flex items-center gap-2.5 md:gap-5">
              <button className="btn" onClick={() => router.back()}>
                <ArrowLeft size={16} /> Go Back
              </button>
              <button className="btn btn-primary" onClick={handleRegisterEntry}>
                Register Entry
              </button>
            </div>
          </div>
          <div>Right Side</div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
