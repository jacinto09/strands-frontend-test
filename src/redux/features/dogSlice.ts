import { BreedImagesCount, Breeds, InitialState } from "@/utils/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: InitialState = {
  breeds: [],
  images: {},
  status: "idle",
};

export const fetchBreedsAndImages = createAsyncThunk(
  "dogs/fetchBreedsAndImages",
  async (): Promise<{ breeds: Breeds; images: BreedImagesCount }> => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);

    // Hacer todas las llamadas para obtener imágenes
    const imagePromises = breeds.map(async (breed) => {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const imgData = await res.json();
      return { breed, count: imgData.message.length };
    });

    const imagesData = await Promise.all(imagePromises);
    const images = imagesData.reduce(
      (acc: Record<string, number>, { breed, count }) => {
        acc[breed] = count;
        return acc;
      },
      {}
    );

    return { breeds, images };
  }
);

const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreedsAndImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreedsAndImages.fulfilled, (state, action) => {
        state.breeds = action.payload.breeds;
        state.images = action.payload.images;
        state.status = "success";
      })
      .addCase(fetchBreedsAndImages.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dogSlice.reducer;
