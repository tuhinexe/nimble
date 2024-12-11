import {
  useFetchProfileMutation,
  useLoginMutation,
  useSignupMutation,
} from "@nimble/store/slices/authApiSlice";

export const useNimbleApi = () => {
  const [signup, signupState] = useSignupMutation();
  const [login, loginState] = useLoginMutation();

  const [fetchProfile, fetchProfileState] = useFetchProfileMutation();

  //   others

  return {
    signup,
    signupState,
    login,
    loginState,
    fetchProfile,
    fetchProfileState,
  };
};
