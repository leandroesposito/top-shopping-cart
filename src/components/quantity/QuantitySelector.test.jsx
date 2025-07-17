import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantituSelector from "./QuantitySelector";

describe("QuantitySelector component", () => {
  it("component render", () => {
    render(<QuantituSelector />);
    const addButton = screen.getByRole("button", { name: /add/i });
    const substractButton = screen.getByRole("button", { name: /substract/i });
    const valueInput = screen.getByLabelText(/value/i);

    expect(addButton).toBeInTheDocument();
    expect(substractButton).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
  });

  it("call onAddClick when clicking + button", async () => {
    const onAddClick = vi.fn();
    const onSubClick = vi.fn();
    const user = userEvent.setup();
    render(
      <QuantituSelector onAddClick={onAddClick} onSubClick={onSubClick} />
    );
    const addButton = screen.getByRole("button", { name: /add/i });

    await user.click(addButton);

    expect(onAddClick).toBeCalled();
    expect(onSubClick).not.toBeCalled();
  });

  it("call onSubClick when clicking - button", async () => {
    const onAddClick = vi.fn();
    const onSubClick = vi.fn();
    const user = userEvent.setup();
    render(
      <QuantituSelector onAddClick={onAddClick} onSubClick={onSubClick} />
    );
    const subButton = screen.getByRole("button", { name: /sub/i });

    await user.click(subButton);

    expect(onSubClick).toBeCalled();
    expect(onAddClick).not.toBeCalled();
  });

  it("don't call onAddClick or onSubClick on render", async () => {
    const onAddClick = vi.fn();
    const onSubClick = vi.fn();
    render(
      <QuantituSelector onAddClick={onAddClick} onSubClick={onSubClick} />
    );

    expect(onSubClick).not.toBeCalled();
    expect(onAddClick).not.toBeCalled();
  });
});
