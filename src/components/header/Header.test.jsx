import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("render element", () => {
    render(<Header />);
    expect(screen.getByText("IShop")).toBeInTheDocument();
  });
});
