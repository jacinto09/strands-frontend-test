"use client";

import { RootState } from "@/redux/store";
import { PieChart, Pie, Cell } from "recharts";
import { fetchBreedsAndImages } from "@/redux/features/dogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
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
  console.log(status);

  const topTenBreeds = formatDataToTopTen(dogBreedImages);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <PieChart width={1200} height={600}>
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
  );
}

export default DogChart;
