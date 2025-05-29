import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Token } from "../../app/models/Token";

interface LoginRequest {
  email: string;
  password: string;
}

export const LoginAPI = createApi({
  reducerPath: "Login",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<Token, LoginRequest>({
      query: (body) => ({
        url: "Login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginOrRegisterMutation } = LoginAPI;
