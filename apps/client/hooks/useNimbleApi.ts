import { signInWithGoogle, loginWithPassword } from "@nimble/firebase/auth";
import {
  useCreateUserMutation,
  useFetchProfileQuery,
  useLoginMutation,
} from "@nimble/store/slices/authApiSlice";

export const useNimbleApi = () => {
  const [createUser, signupState] = useCreateUserMutation();
  const [login, loginState] = useLoginMutation();

  //   others

  return {
    loginWithPassword,
    signInWithGoogle,
    createUser,
    signupState,
    login,
    loginState,
    useFetchProfileQuery,
  };
};
