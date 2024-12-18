import { signInWithGoogle, signUpWithCredentials } from "@nimble/firebase/auth";
import {
  useCreateUserMutation,
  useFetchProfileMutation,
  useLoginMutation,
} from "@nimble/store/slices/authApiSlice";

export const useNimbleApi = () => {
  const [createUser, signupState] = useCreateUserMutation();
  const [login, loginState] = useLoginMutation();

  const [fetchProfile, fetchProfileState] = useFetchProfileMutation();

  //   others

  return {
    signUpWithCredentials,
    signInWithGoogle,
    createUser,
    signupState,
    login,
    loginState,
    fetchProfile,
    fetchProfileState,
  };
};
