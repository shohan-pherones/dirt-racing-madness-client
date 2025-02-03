import { EventsDocument, EventsQuery } from "@/types/generated/graphql";
import { useQuery } from "@apollo/client";

export const useEvents = () => {
  return useQuery<EventsQuery>(EventsDocument);
};
