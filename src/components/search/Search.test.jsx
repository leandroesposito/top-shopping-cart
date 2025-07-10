import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Search from "./Search.jsx";
import userEvent from "@testing-library/user-event";

describe("Search component", () => {
  it("render element", () => {
    render(<Search />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("call onChange when typing", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Search onChange={onChange} />);

    const input = screen.getByRole("textbox");

    await user.type(input, "pants");

    expect(input).toHaveValue("pants");

    expect(onChange).toHaveBeenCalled();
  });

  it("not call onChange when user didn't type", async () => {
    const onChange = vi.fn();
    render(<Search onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
  });
});
