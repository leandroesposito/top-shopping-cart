import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Catalogue from "./Catalogue";

const mockData = {
  1: {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  2: {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  3: {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  5: {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  6: {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  10: {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  11: {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
};

const { mockUseOutletContext, mockUseParams } = vi.hoisted(() => ({
  mockUseOutletContext: vi.fn().mockReturnValue({}),
  mockUseParams: vi.fn().mockReturnValue({}),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: mockUseOutletContext,
    useParams: mockUseParams,
  };
});

vi.mock("../itemCard/ItemCard", () => ({
  default: ({ itemData }) => (
    <>
      <div data-testid="title">{itemData.title}</div>
      <div data-testid="price">{itemData.price}</div>
      <div data-testid="category">{itemData.category}</div>
    </>
  ),
}));

describe("Catalgue component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render items", () => {
    mockUseOutletContext.mockReturnValueOnce({
      data: mockData,
    });
    render(<Catalogue />);

    expect(screen.getByText(mockData[1].title)).toBeInTheDocument();
  });

  it("show loading screen", () => {
    mockUseOutletContext.mockReturnValueOnce({
      loading: true,
    });
    render(<Catalogue />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("show error screen", () => {
    const errorText = "Page not found";
    mockUseOutletContext.mockReturnValueOnce({
      error: { message: errorText },
    });
    render(<Catalogue />);

    expect(screen.getByText("Error...")).toBeInTheDocument();
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  describe("filters items", () => {
    mockUseOutletContext.mockReturnValue({
      data: mockData,
    });

    it("filter by category: jewelery", () => {
      mockUseParams.mockReturnValueOnce({
        category: "jewelery",
      });
      render(<Catalogue />);

      expect(screen.getAllByText("jewelery").length).toBeGreaterThan(0);
      expect(
        screen.getByText("Solid Gold Petite Micropave")
      ).toBeInTheDocument();
      expect(screen.queryByText("electronics")).toBeNull();
    });

    it("filter by category: electronics", () => {
      mockUseParams.mockReturnValueOnce({
        category: "electronics",
      });
      render(<Catalogue />);

      expect(screen.getAllByText("electronics").length).toBeGreaterThan(0);
      expect(
        screen.getByText(
          "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5"
        )
      ).toBeInTheDocument();
      expect(screen.queryByText("jewelery")).toBeNull();
    });

    it("filter by search", () => {
      mockUseParams.mockReturnValueOnce({
        search: "jacket cotton",
      });
      render(<Catalogue />);

      expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
      expect(screen.getAllByTestId("title").length).toBe(1);
    });
  });
});
