import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("render element", () => {
    const getTotalItems = vi.fn();

    render(
      <MemoryRouter>
        <Header getTotalItems={getTotalItems} />
      </MemoryRouter>
    );
    expect(screen.getByText("SCP")).toBeInTheDocument();
  });
});
