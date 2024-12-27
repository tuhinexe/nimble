import { signInWithGoogle, loginWithPassword } from "@nimble/firebase/auth";
import {
  useCreateUserMutation,
  useFetchProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "@nimble/store/slices/authApiSlice";

export const useNimbleApi = () => {
  const [createUser, signupState] = useCreateUserMutation();
  const [login, loginState] = useLoginMutation();
  const [logout, logoutState] = useLogoutMutation();

  //   others

  return {
    loginWithPassword,
    signInWithGoogle,
    createUser,
    signupState,
    login,
    loginState,
    useFetchProfileQuery,
    logout,
    logoutState,
  };
};
