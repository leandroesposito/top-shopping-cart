import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

describe("CartItem component", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useOutletContext: vi.fn(() => ({
          setItemCount: vi.fn(),
        })),
      };
    });
  });

  it("render component", () => {
    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>
    );
    expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
  });
});
