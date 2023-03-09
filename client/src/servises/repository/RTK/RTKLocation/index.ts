import { createApi } from "@reduxjs/toolkit/query/react";
import { ICity, IPoint, IPointStatus } from "@types";
import { defFetchBaseQuery } from "..";

export const LOCATION_API_REDUCER_KEY = "RTK_Location";
export const RTKLocation = createApi({
    reducerPath: LOCATION_API_REDUCER_KEY,
    baseQuery: defFetchBaseQuery,
    tagTypes: ["Location"],
    endpoints: (builder) => ({
        getCiti: builder.query<ICity[], string>({
            query: (city) => ({
                method: "get",
                url: `/city/all?search=${city}`
            })
        }),
        getPoints: builder.query<IPoint[], string>({
            query: (cityId) => ({
                method: "get",
                url: `organization/all?cityId=${cityId}`
            })
        }),
				getPointStatus:builder.mutation<IPointStatus, string>({
					query: (organization) => {
							return {
									method: "get",
									url: `/organization/organizationstatus?organization=${organization}`
							};
					}
				}),
        getRecvisites: builder.mutation<IPoint[], string>({
          query: (cityId) => ({
              method: "get",
              url: `organization/recvisites?organizationId=${cityId}`
          })
      }),
				getStreetCity: builder.query<any[], any>({
				query: (body) => ({
						method: "post",
						url: `/webhook/getstreet`,
						body:body
				})
			})
    })
});

export const { useGetCitiQuery, useGetPointsQuery,useGetRecvisitesMutation, useGetStreetCityQuery,useGetPointStatusMutation } = RTKLocation;

