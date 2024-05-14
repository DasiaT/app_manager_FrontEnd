import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseApiResponse } from "../interfaces generales/Base_API_Response";
import { IWorstation, IWorstationPost, IWorstationFilters, IWorstationPatch, IWorstationDelete } from "./interfaces/IWorkstation";
import { obtenerDatosUsuario } from "../../components_generals/user_datos";
export const workstationAPI = createApi({
    reducerPath: 'workstationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_JS_APP_API_URL + '/api',
        prepareHeaders: (headers) => {
            
            const isLoggedIn = obtenerDatosUsuario();

            headers.set('Authorization', `Bearer ${isLoggedIn?.token}`);
            
            return headers;
        }
    }),
    tagTypes: ['Workstation', 'Workstation'],
    endpoints: (builder) => ({
        getWorkstation: builder.query<BaseApiResponse<IWorstation>, IWorstationFilters>({
            query: ({id, search, take, skip}) => {
                let url = `/Workstation?Take=${take}&Skip=${skip}`;

                if (search && id) {
                    url += `&Search=${search}&Id=${id}`;
                } else if (search) {
                    url += `&Search=${search}`;
                } else if (id) {
                    url += `&Id=${id}`;
                }

                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: (result) => result && result.result 
            ? [...result.result.map(({ id }) => ({ type: 'Workstation', id: id } as const)), { type: 'Workstation', id: 'LIST' }] 
            : [{ type: 'Workstation', id: 'LIST' }],
        }),
        postWorkstation: builder.mutation<BaseApiResponse<IWorstationPost>, IWorstationPost>({
            query: ({name}) => {
                const url = `/Workstation`;

                return {
                    url: url,
                    method: 'POST',
                    body: {
                        Name : name
                    }
                };
            }
        }),
        patchWorkstation: builder.mutation<BaseApiResponse<IWorstationPatch>, IWorstationPatch>({
            query: ({id, name}) => {
                const url = `/Workstation`;

                return {
                    url: url,
                    method: 'PATCH',
                    body: {
                        Id: id,
                        Name : name
                    }
                };
            }
        }),
        deleteWorkstation: builder.mutation<BaseApiResponse<IWorstationDelete>, IWorstationDelete>({
            query: ({id}) => {
                const url = `/Workstation`;

                return {
                    url: url,
                    method: 'DELETE',
                    body: {
                        Id: id
                    }
                };
            }
        })
    })
});


export const {
    useGetWorkstationQuery, 
    usePostWorkstationMutation,
    usePatchWorkstationMutation,
    useDeleteWorkstationMutation
} = workstationAPI; 