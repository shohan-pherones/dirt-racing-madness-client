"use client";

import { FormInput, Processing, SectionTitle } from "@/components/elements";
import { signInInputFields } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { SignInSchema } from "@/schemas/signInSchema";
import {
  AuthResponse,
  SignInInput,
  useSignInMutation,
} from "@/types/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignInPage = () => {
  const methods = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
  });
  const [signInMutation, { loading }] = useSignInMutation();
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = async (data: SignInInput) => {
    try {
      const res = await signInMutation({
        variables: {
          signInInput: data,
        },
      });
      if (res.data?.signIn) {
        login(res.data.signIn as AuthResponse);
        router.push(redirectPath || "/");
      }
    } catch (error) {
      toast.error(error);
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
          <button
            type="button"
            onClick={() =>
              router.push(
                redirectPath ? `/sign-up?redirect=${redirectPath}` : "/sign-up"
              )
            }
            className="link link-secondary"
          >
            Sign Up
          </button>
        </p>
      </FormProvider>
    </section>
  );
};

export default SignInPage;
