import type { Meta, StoryObj } from "@storybook/react";
import SectionTitle from "./SectionTitle";

const meta: Meta<typeof SectionTitle> = {
  title: "Components/SectionTitle",
  component: SectionTitle,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content of the section title",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    children: "Section Title",
  },
};

export const CustomContent: Story = {
  args: {
    children: "This is a Custom Section Title",
  },
};
