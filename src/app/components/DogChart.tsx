"use client";

import { RootState } from "@/redux/store";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchBreedsAndImages } from "@/redux/features/dogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useMemo } from "react";
import { COLORS } from "@/utils/constants";
import { formatDataToTopTen } from "@/utils/format";
function DogChart() {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector((state) => state.dogs.breeds);
  const status = useAppSelector((state) => state.dogs.status);
  useEffect(() => {
    if (breeds.length === 0) {
      dispatch(fetchBreedsAndImages());
    }
  }, [dispatch, breeds]);

  const dogBreedImages = useAppSelector(
    (state: RootState) => state.dogs.images
  );

  const topTenBreeds = useMemo(
    () => formatDataToTopTen(dogBreedImages),
    [dogBreedImages]
  );
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">Failed to load data</h1>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart title="Top 10 dog breeds with the most images">
        <Pie
          data={topTenBreeds}
          dataKey="value"
          nameKey="name"
          label={({ name }) => `${name}`}
        >
          {topTenBreeds?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DogChart;
