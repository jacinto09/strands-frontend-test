import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialState {
  breeds: string[];
  status: string;
}

const initialState: InitialState = {
  breeds: [],
  status: "idle",
};
export const fetchBreeds = createAsyncThunk(
  "dogs/fetchBreeds",
  async (): Promise<string[]> => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    return Object.keys(data.message);
  }
);

const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBreeds.fulfilled, (state, action) => {
      state.breeds = action.payload;
      state.status = "success";
    });
  },
});

export default dogSlice.reducer;
