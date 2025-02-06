"use client";

import { BookingTable } from "@/components/blocks";
import {
  Error,
  Loading,
  Processing,
  SectionTitle,
} from "@/components/elements";
import Avatar from "@/components/elements/Avatar/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useEventQuery,
} from "@/types/generated/graphql";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = use(params);
  const { data, loading, error } = useEventQuery({
    variables: { id: eventId },
  });
  const [createBookingMutation, { loading: isCreateBookingLoading }] =
    useCreateBookingMutation();
  const router = useRouter();
  const { authState } = useAuth();
  const [hasBeenBooked, setHasBeenBooked] = useState<boolean | undefined>(
    false
  );
  const [deleteBookingMutation, { loading: isDeleteBookingLoading }] =
    useDeleteBookingMutation();
  const pathname = usePathname();

  useEffect(() => {
    setHasBeenBooked(
      data?.event.bookings?.some((b) => b.user.id === authState.user?.id)
    );
  }, [authState.user?.id, data?.event.bookings]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!data?.event.id) return notFound();

  const availableEntries = data.event.bookings?.length
    ? data.event.capacity - data.event.bookings.length
    : data.event.capacity;

  const handleRegisterEntry = async () => {
    if (!authState.user?.id) {
      return router.push(`/sign-in?redirect=${pathname}`);
    }

    try {
      const res = await createBookingMutation({
        variables: {
          createBookingInput: { eventId },
        },
      });
      if (res.data?.createBooking) {
        setHasBeenBooked(true);
        toast.success("Event booking created successfully!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRevokeEntry = async () => {
    if (!authState.user?.id) {
      return router.push(`/sign-in?redirect=${pathname}`);
    }

    try {
      const res = await deleteBookingMutation({
        variables: {
          deleteBookingInput: { eventId },
        },
      });
      if (res.data?.deleteBooking) {
        setHasBeenBooked(false);
        toast.success("Event booking deleted successfully!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="container py-10 md:py-20 flex flex-col gap-5 md:gap-10">
      <figure className="max-h-[50vh] aspect-square rounded-xl overflow-hidden">
        <Image
          src={data.event.imageUrl || "/images/placeholder.png"}
          alt={data.event.name}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col gap-2.5 md:gap-5">
        <div className="flex flex-col gap-2.5">
          <span
            className={cn(
              "badge",
              data.event.status === "UPCOMING" && "badge-primary",
              data.event.status === "RUNNING" && "badge-secondary",
              data.event.status === "PAST" && "badge-accent"
            )}
          >
            {data.event.status}
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            {data.event.name}
          </h1>
          <div className="flex items-center gap-2.5 md:gap-5">
            <Avatar user={data.event.user} />
            <p className="flex flex-col">
              <span className="text-sm">Created by</span>
              <Link
                href={`/profile/${data.event.user.id}`}
                className="text-accent font-medium"
              >
                {data.event.user.name}
              </Link>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex flex-col gap-2.5 md:gap-5">
            <SectionTitle margin={false}>Description</SectionTitle>
            <p>{data.event.description}</p>
            <ul>
              <li>
                <b>Date:</b>{" "}
                {format(data.event.dateTime, "dd-MM-yyyy 'at' hh:mm a")}
              </li>
              <li>
                <b>Location:</b> {data.event.location}
              </li>
              <li>
                <b>Available Entries:</b> {availableEntries}
              </li>
            </ul>
            <div className="flex items-center gap-2.5 md:gap-5">
              <button className="btn" onClick={() => router.back()}>
                <ArrowLeft size={16} /> Go Back
              </button>
              {!hasBeenBooked && (
                <button
                  disabled={isCreateBookingLoading}
                  className="btn btn-secondary"
                  onClick={handleRegisterEntry}
                >
                  {isCreateBookingLoading ? <Processing /> : "Register Entry"}
                </button>
              )}
              {hasBeenBooked && (
                <button
                  disabled={isDeleteBookingLoading}
                  className="btn btn-accent"
                  onClick={handleRevokeEntry}
                >
                  {isDeleteBookingLoading ? <Processing /> : "Revoke Entry"}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5 md:gap-5">
            <SectionTitle margin={false}>
              {data.event.bookings?.length
                ? `${data.event.bookings.length} users registered for this event`
                : "No user registered for this event"}
            </SectionTitle>
            {data.event.bookings?.length && (
              <BookingTable bookings={data.event.bookings} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
