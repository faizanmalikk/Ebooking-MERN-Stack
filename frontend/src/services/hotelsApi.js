import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://e-booking-mern-stack.vercel.app/api';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    tagTypes : ['Hotels'],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

       getAllHotels: builder.query({
            query: ({destination = '' , min = 1 , max = 999999 , type}) => {
                return {
                    url: destination && type ? `/hotels?min=${min}&max=${max}&city=${destination}&type=${type}` :
                    destination ?  `/hotels?min=${min}&max=${max}&city=${destination}`:
                    type ?  `/hotels?min=${min}&max=${max}&type=${type}`:
                    `/hotels?min=${min}&max=${max}` ,
                    method: 'Get'
                }
            },

        }),

       countByCity: builder.query({
            query: () => {
                return {
                    url: '/hotel/countByCity?cities=Faisalabad,Karachi,Lahore',
                    method: 'Get'
                }
            },

        }),

       hotelDetails: builder.query({
            query: (id) => {
                return {
                    url: `/hotel/find/${id}`,
                    method: 'Get'
                }
            },

            providesTags : ['Hotels']

        }),

       countByType: builder.query({
            query: () => {
                return {
                    url: '/hotel/countByType',
                    method: 'Get'
                }
            },

        }),

       getFeaturedHotels: builder.query({
            query: (featured) => {
                return {
                    url: `/hotels?featured=${featured}`,
                    method: 'Get'
                }
            },

        }),

        UpdateProduct: builder.mutation({
            query: ({ id, myForm }) => {
                return {
                    url: `/admin/product/${id}`,
                    method: 'Put',
                    body: myForm,
                    credentials: 'include'
                }
            },
         
        }),

        getHotelRooms: builder.query({
            query: (id) => {
                return {
                    url: `/hotel/room/${id}`,
                    method: 'Get',
                    credentials: 'include'
                }
            },

        }),

        UpdateRoomStatus: builder.mutation({
            query: ({roomId , alldates}) => {
                return {
                    url: `/room/status/${roomId}`,
                    method: 'Put',
                    body : { dates : alldates},
                    credentials: 'include'
                }
            },

            // invalidatesTags : ['Hotels']
         
        }),

    

    })
});

export const {

    useCountByCityQuery,
    useCountByTypeQuery,
    useGetFeaturedHotelsQuery,
    useGetAllHotelsQuery,
    useHotelDetailsQuery,
    useGetHotelRoomsQuery,
    useUpdateRoomStatusMutation
 
} = hotelsApi;

