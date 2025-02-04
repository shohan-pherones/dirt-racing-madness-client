import {
  AuthResponse,
  SignInDocument,
  SignInInput,
} from "@/types/generated/graphql";
import { useMutation } from "@apollo/client";

export const useSignIn = () => {
  const [signInMutation, { data, loading, error }] = useMutation<
    { signIn: AuthResponse },
    { signInInput: SignInInput }
  >(SignInDocument);

  const signIn = async (signInInput: SignInInput) => {
    try {
      const res = await signInMutation({ variables: { signInInput } });
      return res.data?.signIn;
    } catch (error) {
      console.log("Sign In Error:", error);
      throw error;
    }
  };

  return { signIn, data, loading, error };
};
