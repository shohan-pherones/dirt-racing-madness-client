import { Event, EventStatus } from "@/types/generated/graphql";
import type { Meta, StoryObj } from "@storybook/react";
import EventCard from "./EventCard";

const meta: Meta<typeof EventCard> = {
  title: "Components/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  argTypes: {
    event: {
      control: "object",
      description: "The event data to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EventCard>;

const mockEvent: Pick<
  Event,
  | "id"
  | "name"
  | "description"
  | "imageUrl"
  | "dateTime"
  | "location"
  | "capacity"
  | "status"
> = {
  id: "1",
  name: "Sample Event",
  description: "This is a sample event description.",
  dateTime: new Date().toISOString(),
  location: "Sample Location",
  capacity: 100,
  status: EventStatus.Upcoming,
  imageUrl: "/images/placeholder.png",
};

export const UpcomingEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      status: EventStatus.Upcoming,
    },
  },
};

export const RunningEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      status: EventStatus.Running,
    },
  },
};

export const PastEvent: Story = {
  args: {
    event: {
      ...mockEvent,
      status: EventStatus.Past,
    },
  },
};

export const NoImage: Story = {
  args: {
    event: {
      ...mockEvent,
      imageUrl: null,
    },
  },
};

export const LongDescription: Story = {
  args: {
    event: {
      ...mockEvent,
      description:
        "This is a very long event description that should be truncated in the UI. It goes on and on and on...",
    },
  },
};
