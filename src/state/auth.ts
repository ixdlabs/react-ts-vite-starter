import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IAuthData {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  jwtToken: string;
}

interface IAuthState {
  data?: IAuthData;
  loginAction: (token: IAuthData) => void;
  logoutAction: () => void;
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      set => ({
        data: undefined,
        provider: undefined,
        loginAction: data => set({ data }),
        logoutAction: () => set({ data: undefined }),
      }),
      { name: "auth", getStorage: () => localStorage }
    )
  )
);

export function useAuth() {
  const { data, loginAction, logoutAction } = useAuthStore();

  const mutation = useMutation<IAuthData>(
    () => {
      // TODO: implement login function
      return Promise.resolve({
        email: "string",
        firstName: "string",
        lastName: "string",
        id: "string",
        jwtToken: "string",
      });
    },
    {
      onSuccess: (resData: IAuthData) => {
        loginAction(resData);
      },
    }
  );
  const { error, isLoading: loginLoading, mutate } = mutation;
  const loginError = error ? (error as Error).message : "";

  const login = useCallback(() => mutate(), [mutate]);

  return {
    data,
    isAuth: !!data,
    token: data?.jwtToken ?? "",
    loginLoading,
    loginError,
    login,
    logout: logoutAction,
    loginAction,
    logoutAction,
  };
}
