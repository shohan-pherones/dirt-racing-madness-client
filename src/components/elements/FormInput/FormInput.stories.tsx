import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";

const meta = {
  title: "Components/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name of the input field",
    },
    label: {
      control: "text",
      description: "The label for the input field",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "select"],
      description: "The type of input field",
    },
    options: {
      control: "object",
      description: "Options for the select input",
    },
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof FormInput>;

export const TextInput: Story = {
  args: {
    name: "textInput",
    label: "Text Input",
    type: "text",
    placeholder: "Enter text...",
  },
};

export const EmailInput: Story = {
  args: {
    name: "emailInput",
    label: "Email Input",
    type: "email",
    placeholder: "Enter email...",
  },
};

export const PasswordInput: Story = {
  args: {
    name: "passwordInput",
    label: "Password Input",
    type: "password",
    placeholder: "Enter password...",
  },
};

export const SelectInput: Story = {
  args: {
    name: "selectInput",
    label: "Select Input",
    type: "select",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const WithError: Story = {
  args: {
    name: "errorInput",
    label: "Input with Error",
    type: "text",
    placeholder: "This field has an error",
  },
  decorators: [
    (Story, { args }) => {
      const methods = useForm();
      methods.setError(args.name, {
        type: "manual",
        message: "This field is required",
      });
      return (
        <FormProvider {...methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};
