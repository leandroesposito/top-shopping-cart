import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import Search from "./Search.jsx";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const useNavigateMock = vi.fn();

describe("Search component", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useNavigate: () => useNavigateMock,
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render element", () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("call navigate with typed value when typing", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "pants");

    expect(input).toHaveValue("pants");

    expect(useNavigateMock).toHaveBeenCalled();
    expect(useNavigateMock).toHaveBeenCalledWith("/search/pants");
  });

  it("not call navigate when user didn't type", async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(useNavigateMock).not.toHaveBeenCalled();
  });

  it("call navigate to catalogue when input is emptied", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "pants");
    expect(input).toHaveValue("pants");
    expect(useNavigateMock).toHaveBeenCalledWith("/search/pants");

    await user.clear(input);
    expect(useNavigateMock).toHaveBeenCalledWith("/catalogue");
  });
});
