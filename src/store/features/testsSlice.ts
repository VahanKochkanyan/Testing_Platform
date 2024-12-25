import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { constants } from "../../utils/constants"
import { ITests, ITestsState } from "../../types"

const { BASE_URL } = constants;

const initialState: ITestsState = {
  testsList: [],
}

export const getTestsAsync = createAsyncThunk(
  "tests/getTestsAsync",
  async () => {
    const response = await axios.get(`${BASE_URL}/tests`)
    const tests: ITests[] = response.data;
    return tests;
  }
)


export const createTestAsync = createAsyncThunk(
  'tests/createTest',
  async (newTest: ITests) => {
    const response = await axios.post(`${BASE_URL}/tests`, newTest)
    return response.data;
  }
)


export const deleteTestAsync = createAsyncThunk(
  "tests/deleteTestAsync",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/tests/${id}`)
    return id; 
  }
)


const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestsAsync.fulfilled, (state, action) => {
        state.testsList = action.payload
      })
      .addCase(createTestAsync.fulfilled, (state, action) => {
        state.testsList.push(action.payload)
      })
      .addCase(deleteTestAsync.fulfilled, (state, action) => {
        state.testsList = state.testsList.filter((test) => test.id !== action.payload)
      })
  },
})

export default testsSlice.reducer
