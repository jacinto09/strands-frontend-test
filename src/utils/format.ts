import { ChartData, FormatData } from "./types";

export const formatDataToTopTen = (data: FormatData): ChartData[] => {
  const dataToChart: ChartData[] = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));
  const topTenBreeds: ChartData[] = dataToChart
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  return topTenBreeds;
};
