"use client";

import { FormInput, Processing, SectionTitle } from "@/components/elements";
import { signUpInputFields } from "@/constants";
import { SignUpSchema } from "@/schemas/signUpSchema";
import { SignUpInput, useSignUpMutation } from "@/types/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
  const methods = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });
  const [signUpMutation, { loading }] = useSignUpMutation();

  const onSubmit = async (data: SignUpInput) => {
    try {
      const res = await signUpMutation({
        variables: {
          signUpInput: data,
        },
      });
      console.log("Signup successful:", res.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <section className="container py-10 md:py-20 max-w-xl">
      <SectionTitle>Create a new account</SectionTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {signUpInputFields.map((field) => (
            <FormInput
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              options={field.options}
            />
          ))}
          <button
            disabled={loading}
            type="submit"
            className="btn btn-secondary w-full"
          >
            {loading ? <Processing /> : "Sign Up"}
          </button>
        </form>
        <p className="mt-2.5">
          Already have an account?{" "}
          <Link href="/sign-in" className="link link-secondary">
            Sign In
          </Link>
        </p>
      </FormProvider>
    </section>
  );
};

export default SignUpPage;
