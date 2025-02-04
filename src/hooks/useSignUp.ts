import {
  AuthResponse,
  SignUpDocument,
  SignUpInput,
} from "@/types/generated/graphql";
import { useMutation } from "@apollo/client";

export const useSignUp = () => {
  const [signUpMutation, { data, loading, error }] = useMutation<
    { signUp: AuthResponse },
    { signUpInput: SignUpInput }
  >(SignUpDocument);

  const signUp = async (signUpInput: SignUpInput) => {
    try {
      const res = await signUpMutation({ variables: { signUpInput } });
      return res.data?.signUp;
    } catch (error) {
      console.log("Sign Up Error:", error);
      throw error;
    }
  };

  return { signUp, data, loading, error };
};
