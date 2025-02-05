import { cn } from "@/lib/utils";
import { Event } from "@/types/generated/graphql";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Pick<
    Event,
    | "id"
    | "name"
    | "description"
    | "imageUrl"
    | "dateTime"
    | "location"
    | "capacity"
    | "status"
  >;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <article className="card bg-base-300 shadow">
      <figure className="aspect-video">
        <Image
          src={event.imageUrl || "/images/placeholder.png"}
          alt={event.name}
          width={1280}
          height={720}
          priority
        />
      </figure>
      <div className="card-body">
        <span
          className={cn(
            "badge",
            event.status === "UPCOMING" && "badge-primary",
            event.status === "RUNNING" && "badge-secondary",
            event.status === "PAST" && "badge-accent"
          )}
        >
          {event.status}
        </span>
        <h2 className="card-title">{event.name}</h2>
        <p className="text-sm opacity-50">
          {event.description.substring(0, 50)}...
        </p>
        <ul className="text-sm">
          <li>
            <b>Date:</b> {format(event.dateTime, "dd-MM-yyyy 'at' hh:mm a")}
          </li>
          <li>
            <b>Location:</b> {event.location}
          </li>
          <li>
            <b>Available Entries:</b> {event.capacity}
          </li>
        </ul>
        <div className="card-actions justify-end">
          <Link href={`/events/${event.id}`} className="btn btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
