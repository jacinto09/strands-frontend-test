"use client";

import { RootState } from "@/redux/store";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { fetchBreedsAndImages } from "@/redux/features/dogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useMemo } from "react";
import { COLORS } from "@/utils/constants";
import { formatDataToTopTen } from "@/utils/format";
import LoadingSpinner from "./LoadingSpinner";
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
    return (
      <div className="text-xl w-full h-full text-center flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">Failed to load data</h1>
      </div>
    );
  }

  return (
    <div className="container w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart title="Top 10 dog breeds with the most images">
          <Pie
            data={topTenBreeds}
            dataKey="value"
            nameKey="name"
            label={({ name }) => `${name}`}
          >
            {topTenBreeds?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                strokeWidth={3}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DogChart;
