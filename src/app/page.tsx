"use client";

import dynamic from "next/dynamic";

const DogChartNoSSR = dynamic(() => import("./components/DogChart"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container mx-auto w-full h-full flex items-center justify-center flex-col p-8">
      <h1 className="text-2xl font-bold">
        Top 10 dog breeds with the most images
      </h1>
      <DogChartNoSSR />
    </div>
  );
}
