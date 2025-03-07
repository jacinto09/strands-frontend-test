import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DogChart from "../app/components/DogChart";

jest.mock("../utils/format", () => ({
  formatDataToTopTen: jest.fn((images) => {
    return images && images.length > 0 ? [{ name: "Labrador", value: 10 }] : [];
  }),
}));

const renderWithStore = (initialDogsState: {
  breeds: string[];
  status: string;
  images: { breed: string; image: string }[];
}) => {
  const store = configureStore({
    reducer: {
      dogs: (state = initialDogsState) => state,
    },
  });

  return render(
    <Provider store={store}>
      <div style={{ width: "1200px", height: "600px" }}>
        <DogChart />
      </div>
    </Provider>
  );
};

describe("DogChart Component", () => {
  test('renders "Loading..." when status is "loading"', () => {
    const initialState = {
      breeds: [],
      status: "loading",
      images: [],
    };

    renderWithStore(initialState);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test('renders error message when status is "failed"', () => {
    const initialState = {
      breeds: [],
      status: "failed",
      images: [],
    };

    renderWithStore(initialState);
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  test("renders container with correct dimensions", () => {
    const store = configureStore({
      reducer: {
        dogs: (state = { breeds: [], status: "success", images: [] }) => state,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <div className="container mx-auto w-full flex items-center justify-center flex-col p-8 h-screen">
          <div className="container w-full h-full">
            <DogChart />
          </div>
        </div>
      </Provider>
    );

    const fullContainer = container.querySelector("div.w-full.h-full");
    expect(fullContainer).toBeInTheDocument();

    const rechartsContainer = fullContainer?.querySelector(
      "div.recharts-responsive-container"
    );
    expect(rechartsContainer).toBeInTheDocument();

    expect(rechartsContainer).toHaveStyle({
      width: "100%",
      height: "100%",
    });
  });
});
