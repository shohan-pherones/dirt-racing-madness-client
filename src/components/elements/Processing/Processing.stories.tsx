import type { Meta, StoryObj } from "@storybook/react";
import Processing from "./Processing";

const meta = {
  title: "Components/Processing",
  component: Processing,
  tags: ["autodocs"],
} satisfies Meta<typeof Processing>;

export default meta;

type Story = StoryObj<typeof Processing>;

export const Default: Story = {};
