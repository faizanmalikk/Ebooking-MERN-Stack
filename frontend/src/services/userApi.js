import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const baseUrl = 'http://localhost:5000/api';



export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({


        LoginUser: builder.mutation({
            query: (myForm) => {
                return {
                    url: '/login',
                    method: 'Post',
                    body: myForm,
                    credentials: 'include'
                }
            },

        }),

        RegisterUser: builder.mutation({
            query: (myForm) => {
                return {
                    url: '/register',
                    method: 'Post',
                    body: myForm,
                    credentials: 'include'
                }
            },

        }),

        LoadUser: builder.query({
            query: () => {
                return {
                    url: '/me',
                    method: 'Get',
                    credentials: 'include'
                }
            },

        }),

        LogoutUser: builder.mutation({
            query: () => {
                return {
                    url: '/logout',
                    method: 'Post',
                    credentials: 'include'
                }
            },

        }),

        UpdateUser: builder.mutation({
            query: (myForm) => {
                return {
                    url: '/user/update',
                    method: 'Put',
                    body : myForm,
                    credentials: 'include'
                }
            },

        }),

        UpdateUserPass: builder.mutation({
            query: (myForm) => {
                return {
                    url: '/pass/update',
                    method: 'Put',
                    body : myForm,
                    credentials: 'include'
                }
            },

        }),


    })
});

export const {

    useLoginUserMutation,
    useRegisterUserMutation,
    useLoadUserQuery,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useUpdateUserPassMutation

} = userApi;

