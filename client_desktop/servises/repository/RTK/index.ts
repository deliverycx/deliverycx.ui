import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { push } from 'connected-react-router';
import { AuthFailAction } from 'servises/redux/slice/profileSlice';


export const defFetchBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL, credentials: "include",
	prepareHeaders: (headers) => {
	
		headers.set('localhost', `${document.location.protocol}//${document.location.host}`);
		
		return headers;
},
})

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");  
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
			headers.set('localhost', `${document.location.protocol}//${document.location.host}`);
			
      return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    
    api.dispatch(AuthFailAction()) 
    api.dispatch(push('/')) 
    
  }
  if (result.error && result.error.status === 404) {
    api.dispatch(push('/404')) 
  }
  return result;
};
