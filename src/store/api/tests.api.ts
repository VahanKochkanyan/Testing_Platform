import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { constants } from "../../utils/constants"
import { ITests } from "../../types"

const { BASE_URL } = constants

export const testsApi = createApi({
    reducerPath: "testsApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Tests"],
    endpoints: (builder) => ({
        getAllTests: builder.query<ITests, string | undefined>({
            query: (id) => `/tests/${id}`,
            providesTags: ["Tests"],
        }),
        getTestsList: builder.query<ITests[], void>({
            query: () => `/tests`,
            providesTags: ["Tests"],
        }),
        updateTest: builder.mutation<void, ITests>({
            query: (test) => ({
                url: `/tests/${test.id}`,
                method: "PUT",
                body: test,
            }),
            invalidatesTags: ["Tests"],
        }),
        updateUserAnswer: builder.mutation<void, { testId: string; questionId: number | string; userAnswer: string }>({
            query: ({ testId, questionId, userAnswer }) => ({
                url: `/tests/${testId}`,
                method: "PATCH",
                body: {
                    questions: [
                        {
                            id: questionId,
                            userAnswer,
                        },
                    ],
                },
            }),
            invalidatesTags: ["Tests"],
        }),
    }),
})

export const { useGetAllTestsQuery, useGetTestsListQuery, useUpdateTestMutation, useUpdateUserAnswerMutation } = testsApi
