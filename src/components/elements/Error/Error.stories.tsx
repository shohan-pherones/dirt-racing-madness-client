import type { Meta, StoryObj } from "@storybook/react";
import Error from "./Error";

const meta: Meta<typeof Error> = {
  title: "Components/Error",
  component: Error,
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "The error message to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    message: "An error occurred",
  },
};

export const CustomMessage: Story = {
  args: {
    message: "Something went wrong. Please try again later.",
  },
};

export const NoMessage: Story = {
  args: {
    message: "",
  },
};
