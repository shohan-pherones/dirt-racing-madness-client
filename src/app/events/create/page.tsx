"use client";

import { FormInput, Processing, SectionTitle } from "@/components/elements";
import { createEventInputFields } from "@/constants";
import { CreateEventSchema } from "@/schemas/createEventSchema";
import {
  CreateEventInput,
  useCreateEventMutation,
} from "@/types/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEventPage = () => {
  const methods = useForm<CreateEventInput>({
    resolver: zodResolver(CreateEventSchema),
  });
  const [createEventMutation, { loading }] = useCreateEventMutation();
  const router = useRouter();

  const onSubmit = async (data: CreateEventInput) => {
    try {
      const res = await createEventMutation({
        variables: {
          createEventInput: data,
        },
      });
      if (res.data?.createEvent) {
        router.push("/events");
        toast.success("Event created successfully!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="container py-10 md:py-20 max-w-xl">
      <SectionTitle>Create a new event</SectionTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {createEventInputFields.map((field) => (
            <FormInput
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
          <button
            disabled={loading}
            type="submit"
            className="btn btn-accent w-full"
          >
            {loading ? <Processing /> : "Create"}
          </button>
        </form>
      </FormProvider>
    </section>
  );
};

export default CreateEventPage;
