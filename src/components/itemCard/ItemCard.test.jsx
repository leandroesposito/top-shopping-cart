import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemCard from "./ItemCard";

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

describe("ItemCard component", () => {
  it("render component", () => {
    render(<ItemCard itemData={sampleItem} />);
    expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
  });

  it("call addToCart on click", async () => {
    const addToCart = vi.fn();
    const user = userEvent.setup();
    render(<ItemCard itemData={sampleItem} addToCart={addToCart} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    expect(addToCart).toBeCalled();
  });
});
