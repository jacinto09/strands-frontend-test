"use client";

import dynamic from "next/dynamic";

const DogChartNoSSR = dynamic(() => import("./components/DogChart"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container mx-auto w-full flex items-center justify-center flex-col p-8 h-screen">
      <h1 className="sm:text-2xl font-bold">
        Top 10 dog breeds with the most images
      </h1>
      <div className="container w-full h-full">
        <DogChartNoSSR />
      </div>
    </div>
  );
}
