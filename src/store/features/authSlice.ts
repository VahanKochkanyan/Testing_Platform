import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { constants } from "../../utils/constants"
import { IUser, IAuthState, ICheckAndAddUserAsync } from "../../types"

const { BASE_URL } = constants

const initialState: IAuthState = {
  user: {
    name: sessionStorage.getItem("userName") || "",
    id: "",
  },
}

export const checkAndAddUserAsync = createAsyncThunk(
  "auth/checkAndAddUserAsync",
  async ({ name, errorFn, successFn }: ICheckAndAddUserAsync) => {
    const response = await axios.get(`${BASE_URL}/results?name=${name}`)
    const users: IUser[] = response.data

    if (users.length) {
      errorFn()
      throw new Error("User is already")
    } else {
      const response = await axios.post(`${BASE_URL}/results`, { name })
      const user: IUser = response.data
      successFn(user.name)
      return user
    }
  },
)


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAndAddUserAsync.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export default authSlice.reducer
