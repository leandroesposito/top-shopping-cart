import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

const sampleItem = {
  id: 3,
  title: "Mens Cotton Jacket",
  price: 55.99,
  description:
    "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  rating: { rate: 4.7, count: 500 },
};

const setItemCountMock = vi.fn();
const removeFromCartMock = vi.fn();

describe("CartItem component", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useOutletContext: vi.fn(() => ({
          setItemCount: setItemCountMock,
          removeFromCart: removeFromCartMock,
        })),
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("render component", () => {
    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>
    );
    expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
  });

  it("call removeFromCart on click", async () => {
    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const removeFromCartBtn = screen.getByRole("button", {
      name: /remove from cart/i,
    });
    await user.click(removeFromCartBtn);

    expect(removeFromCartMock).toHaveBeenCalled();
  });

  it("call setItemCount when click add button", async () => {
    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const addBtn = screen.getByRole("button", {
      name: /add/i,
    });
    await user.click(addBtn);

    expect(setItemCountMock).toHaveBeenCalled();
  });

  it("call setItemCount when click substract button", async () => {
    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const substractBtn = screen.getByRole("button", {
      name: /substract/i,
    });
    await user.click(substractBtn);

    expect(setItemCountMock).toHaveBeenCalled();
  });
});
