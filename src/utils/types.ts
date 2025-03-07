export interface InitialState {
  breeds: string[];
  images: { [key: string]: number };
  status: string;
}
export type BreedImagesCount = Record<string, number>;
export type Breeds = string[];

export interface FormatData {
  [key: string]: number;
}

export interface ChartData {
  name: string;
  value: number;
}
