import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Search from "./Search.jsx";

describe("Search component", () => {
  it("render element", () => {
    render(<Search />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });
});
