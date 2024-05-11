import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseApiResponse } from "../interfaces generales/Base_API_Response";
import { ILogin } from "./interfaces/IloginResponse";

export const loginAPI = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_JS_APP_API_URL + '/api',
    }),
    tagTypes: ['Login', 'Login'],
    endpoints: (builder) => ({
        postLogin: builder.mutation<BaseApiResponse<ILogin>, ILogin>({
            query: ({User_Name, Password}) => {
                const url = `/User/Login`;

                return {
                    url: url,
                    method: 'POST',
                    body: {
                        user_Name : User_Name,
                        password : Password
                    }
                };
            }
        }),
    })
});


export const {
    usePostLoginMutation
} = loginAPI; 