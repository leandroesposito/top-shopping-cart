import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";
import userEvent from "@testing-library/user-event";

const data = {
  1: {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
};

const mockAddToCart = vi.fn();

describe("Product component", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useOutletContext: vi.fn(() => ({
          data: data,
          addToCart: mockAddToCart,
        })),
        useParams: vi.fn(() => ({
          id: 1,
        })),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Product render", () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    expect(screen.getByText(data[1].title)).toBeInTheDocument();
  });

  it("Call addToCart on click", async () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    expect(mockAddToCart).toBeCalled();
  });

  it("render QuantitySelector", () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );
    const addButton = screen.getByRole("button", { name: "add" });
    const substractButton = screen.getByRole("button", { name: "substract" });
    const value = screen.getByLabelText("value");

    expect(addButton).toBeInTheDocument();
    expect(substractButton).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    expect(value.textContent).toBe("1");
  });

  it("clicking QuantitySelector add button increase its value", async () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "add" });
    const value = screen.getByLabelText("value");

    const clicks = 3;

    for (let i = 0; i < clicks - 1; i++) {
      await user.click(addButton);
    }

    expect(value.textContent).toBe(clicks.toString());
  });

  it("clicking QuantitySelector substract button decrease its value", async () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "add" });
    const substractButton = screen.getByRole("button", { name: "substract" });
    const value = screen.getByLabelText("value");

    let clicks = 3;

    for (let i = 0; i < clicks - 1; i++) {
      await user.click(addButton);
    }

    await user.click(substractButton);
    clicks -= 1;

    expect(value.textContent).toBe(clicks.toString());
  });
});
