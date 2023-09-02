import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api= "https://opentdb.com/api.php?amount=15"

export const fetchData = createApi({
  reducerPath: 'fetchData',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com/' }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: (name) => `api.php/?amount=15`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuestionsQuery } = fetchData;