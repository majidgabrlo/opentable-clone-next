import axios from "axios";
import { FormValuesTypes } from "../components/AuthSignUp";
import { useUser } from "../context/AuthContext";
import { removeCookies } from "cookies-next";

export const useAuth = () => {
  const { setAuthState, ...restUserState } = useUser();

  const signIn = async (
    email: string,
    password: string,
    handleClose: () => void
  ) => {
    setAuthState({ ...restUserState, loading: true });
    try {
      const payload = await axios.post("/api/auth/signin", { email, password });
      setAuthState({
        ...restUserState,
        loading: false,
        data: payload.data,
        error: null,
      });
            
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error?.response?.data.errorMessage,
        loading: false,
      });
    }
  };

  const signUp = async (
    userFormData: FormValuesTypes,
    handleClose: () => void
  ) => {
    setAuthState({ ...restUserState, loading: true });
    try {
      const payload = await axios.post("/api/auth/signup", { ...userFormData });
      setAuthState({
        ...restUserState,
        loading: false,
        data: payload.data,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error?.response?.data.errorMessage,
        loading: false,
      });
    }
  };

  const signOut = () => {
    removeCookies("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signIn, signUp, signOut };
};
