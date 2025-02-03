import { EventDocument, EventQuery } from "@/types/generated/graphql";
import { useQuery } from "@apollo/client";

export const useEvent = (id: string) => {
  return useQuery<EventQuery>(EventDocument, {
    variables: { id },
  });
};
