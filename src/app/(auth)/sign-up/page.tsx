"use client";

import { FormInput, Processing, SectionTitle } from "@/components/elements";
import { signUpInputFields } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { SignUpSchema } from "@/schemas/signUpSchema";
import {
  AuthResponse,
  SignUpInput,
  useSignUpMutation,
} from "@/types/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const methods = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });
  const [signUpMutation, { loading }] = useSignUpMutation();
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = async (data: SignUpInput) => {
    try {
      const res = await signUpMutation({
        variables: {
          signUpInput: data,
        },
      });
      if (res.data?.signUp) {
        login(res.data.signUp as AuthResponse);
        router.push(redirectPath || "/");
      }
    } catch (error) {
      toast.error(error);
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
          <button
            type="button"
            onClick={() =>
              router.push(
                redirectPath ? `/sign-in?redirect=${redirectPath}` : "/sign-in"
              )
            }
            className="link link-secondary"
          >
            Sign In
          </button>
        </p>
      </FormProvider>
    </section>
  );
};

export default SignUpPage;
