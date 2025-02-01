import { createSlice } from "@reduxjs/toolkit";
import { fetchAllQuizzes, fetchQuiz } from "./api";

const initialState = {
    quizzes: {},
    loading: false,
    error: null
}

const slice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuizzes.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
                state.loading = false
                state.quizzes = action.payload.quizzes.reduce((acc, quiz) => {
                    acc[quiz._id] = quiz
                    return acc
                }, {})
            })
            .addCase(fetchAllQuizzes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(fetchQuiz.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false
                const quizId = action.payload.quizFetched._id;
                const quiz = action.payload.quizFetched;
                state.quizzes[quizId] = quiz
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export default slice.reducer;