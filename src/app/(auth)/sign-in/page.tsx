"use client";

import { FormInput, Processing, SectionTitle } from "@/components/elements";
import { signInInputFields } from "@/constants";
import { SignInSchema } from "@/schemas/signInSchema";
import { SignInInput, useSignInMutation } from "@/types/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const SignInPage = () => {
  const methods = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
  });
  const [signInMutation, { loading }] = useSignInMutation();

  const onSubmit = async (data: SignInInput) => {
    try {
      const res = await signInMutation({
        variables: {
          signInInput: data,
        },
      });
      console.log("Signin successful:", res.data);
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  return (
    <section className="container py-10 md:py-20 max-w-xl">
      <SectionTitle>Login to your account</SectionTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {signInInputFields.map((field) => (
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
            className="btn btn-secondary w-full"
          >
            {loading ? <Processing /> : "Sign In"}
          </button>
        </form>
        <p className="mt-2.5">
          Don&apos; have an account?{" "}
          <Link href="/sign-up" className="link link-secondary">
            Sign Up
          </Link>
        </p>
      </FormProvider>
    </section>
  );
};

export default SignInPage;
