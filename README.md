# Shopping Cart - React Router, Data Fetching & Testing

A e-commerce shopping cart application simulator built with React as a learning project, demonstrating client-side routing, data fetching patterns, custom hooks, comprehensive testing, and multiple styling approaches.

## Learning Objectives

This project was specifically designed to demonstrate and practice:

- **React Router** - Client-side routing, nested routes, dynamic paths, catch-all routes
- **React Testing** - Unit testing components with Vitest and Testing Library
- **Mocking** - Mocking callbacks, components, and hooks
- **Type Checking** - PropTypes for runtime type validation
- **Data Fetching** - Fetch requests, error handling, lifting requests up
- **Custom Hooks** - Creating reusable hook logic
- **Styling React Apps** - CSS Modules, CSS-in-JS, utility frameworks, component libraries

## Live Demo

[View Live Demo](https://prismatic-cheesecake-c74827.netlify.app/)

## React Testing

### Test Setup with Vitest

```javascript
// tests/setup.js - Global test configuration
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers); // Extend with jest-dom matchers

afterEach(() => {
  cleanup(); // Clean up after each test
});
```

### Component Testing Example

```jsx
// CartItem.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CartItem from "./CartItem";

describe("CartItem component", () => {
  it("calls removeFromCart on click", async () => {
    const removeFromCartMock = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartItem itemData={sampleItem} />
      </MemoryRouter>,
    );

    const removeBtn = screen.getByRole("button", { name: /remove from cart/i });
    await user.click(removeBtn);

    expect(removeFromCartMock).toHaveBeenCalled();
  });
});
```

### Mocking Strategies

#### Mocking Callbacks

```javascript
// QuantitySelector.test.jsx
it("calls onAddClick when clicking + button", async () => {
  const onAddClick = vi.fn(); // Create mock function
  const user = userEvent.setup();

  render(<QuantitySelector onAddClick={onAddClick} />);

  await user.click(screen.getByRole("button", { name: /add/i }));
  expect(onAddClick).toHaveBeenCalled(); // Verify call
});
```

#### Mocking Components

```javascript
// Cart.test.jsx - Mock child component
vi.mock("../cartItem/CartItem", () => ({
  default: ({ itemData, quantity }) => (
    <>
      <div>{itemData.title}</div>
      <div>{quantity}</div>
    </>
  ),
}));
```

#### Mocking Hooks and Context

```javascript
// Catalogue.test.jsx - Mock useOutletContext
const { mockUseOutletContext } = vi.hoisted(() => ({
  mockUseOutletContext: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: mockUseOutletContext,
  };
});

// In test
mockUseOutletContext.mockReturnValue({
  data: mockData,
  loading: false,
  error: null,
});
```

## Type Checking with PropTypes

```jsx
// PropTypes (if using legacy React)
import PropTypes from "prop-types";

function ItemCard({ itemData, addToCart }) {
  // component logic
}

ItemCard.propTypes = {
  itemData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};
```

## React Router

### Setting Up Routes

```jsx
// main.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

### Route Configuration

```jsx
// routes.jsx
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // Index route
      { path: "catalogue", element: <Catalogue /> }, // Static route
      { path: "catalogue/category/:category", element: <Catalogue /> }, // Dynamic
      { path: "product/:id", element: <Product /> }, // Dynamic with param
      { path: "search/:search", element: <Catalogue /> }, // Dynamic
      { path: "cart", element: <Cart /> }, // Static route
    ],
  },
];
```

### Dynamic Routes with Parameters

```jsx
// Product.jsx - Accessing dynamic parameters
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams(); // Captures :id from URL
  const { data } = useOutletContext();
  const itemData = data[id];

  return <div>{itemData.title}</div>;
}
```

### Catch-All Routes (Error Handling)

```jsx
// ErrorPage.jsx - Catch-all error route
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();  // Captures any router errors

  return <div>{error.statusText || error.message}</div>;
}

// routes.jsx - Attach error element
{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,  // Catches all route errors
  children: [...]
}
```

### Passing Data via Outlet Context

```jsx
// App.jsx - Parent component providing data
import { Outlet } from "react-router-dom";

function App() {
  const { data, loading, error, addToCart, cart } = useCartAndFetch();

  return (
    <div>
      <Header />
      <main>
        <Outlet context={{ data, loading, error, addToCart, cart }} />
      </main>
    </div>
  );
}

// Child component consuming data
function Catalogue() {
  const { data, loading, error, addToCart } = useOutletContext();
  // Use data from parent
}
```

## Fetching Data in React

### Custom Hook for Data Fetching

```jsx
// hooks/useFetchData.js
import { useEffect, useState } from "react";

function useFetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function toObject(data) {
    const obj = {};
    for (const item of data) {
      obj[item.id] = item;
    }
    return obj;
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => setData(toObject(data)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

### Error Handling

```jsx
// Catalogue.jsx
function Catalogue() {
  const { data, loading, error, addToCart } = useOutletContext();

  if (error) {
    return <Error error={error} />; // Show error UI
  }

  if (loading) {
    return <Loading />; // Show loading UI
  }

  return <div>{/* Render data */}</div>;
}
```

### Lifting Requests Up

```jsx
// App.jsx - Fetch data once at top level
function App() {
  // Data fetched here, shared with all children via Outlet context
  const { data, loading, error } = useFetchData();

  return <Outlet context={{ data, loading, error }} />;
}

// No child components fetch data themselves - they receive it via context
```

## Custom Hooks

### useCart Hook

```jsx
// hooks/useCart.js
import { useState } from "react";

function useCart() {
  const [cart, setCart] = useState({});

  function getCart() {
    return { ...cart }; // Return copy to prevent mutation
  }

  function getTotalItems() {
    return Object.values(cart).reduce((acc, curr) => acc + curr, 0);
  }

  function addToCart(itemId, count = 1) {
    const addedItem = cart[itemId];
    const newCount = (addedItem ? addedItem : 0) + count;
    setItemCount(itemId, newCount);
  }

  function setItemCount(itemId, count) {
    setCart({ ...cart, [itemId]: count });
  }

  function removeFromCart(itemId) {
    const { [itemId]: _, ...newCart } = cart; // Destructure to remove
    setCart(newCart);
  }

  return { getCart, getTotalItems, addToCart, setItemCount, removeFromCart };
}
```

### Usage in App

```jsx
function App() {
  const { data, loading, error } = useFetchData(); // Fetch hook
  const { getCart, getTotalItems, addToCart, setItemCount, removeFromCart } =
    useCart(); // Cart hook

  return (
    <Outlet
      context={{
        data,
        loading,
        error,
        addToCart,
        cart: getCart(),
        setItemCount,
        removeFromCart,
      }}
    />
  );
}
```

## Styling React Applications

### 1. CSS Modules (Used in this project)

```css
/* Cart.module.css */
.cart {
  display: flex;
  flex-direction: column;
}

.tableHeaders {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

/* Component import */
import styles from "./Cart.module.css";

function Cart() {
  return <div className={styles.cart}>...</div>;
}
```

**Benefits:**

- Scoped styles (no collisions)
- Dynamic class names with hashes
- Easy to understand (regular CSS syntax)

### 2. CSS-in-JS (Alternative)

```jsx
// Styled Components example
import styled from "styled-components";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

function Cart() {
  return (
    <CartContainer>
      <Title>Shopping Cart</Title>
    </CartContainer>
  );
}
```

### 3. CSS Utility Frameworks (Alternative)

```jsx
// Tailwind CSS example
function Cart() {
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-2xl mb-4 font-bold">Shopping Cart</h2>
      <div className="flex justify-end gap-4">{/* Content */}</div>
    </div>
  );
}
```

### 4. Component Libraries (Alternative)

```jsx
// Material-UI example
import { Button, Card, Typography, Box } from "@mui/material";

function Cart() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4">Shopping Cart</Typography>
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </Box>
  );
}
```

## Project Structure

```
shopping-cart/
├── src/
│   ├── components/
│   │   ├── cart/           # Cart page
│   │   ├── cartIcon/       # Cart icon with badge
│   │   ├── cartItem/       # Individual cart item
│   │   ├── catalogue/      # Product listing
│   │   ├── error/          # Error display
│   │   ├── header/         # Site header
│   │   ├── home/           # Home page
│   │   ├── itemCard/       # Product card
│   │   ├── loading/        # Loading spinner
│   │   ├── navbar/         # Navigation links
│   │   ├── product/        # Product detail
│   │   ├── quantity/       # Quantity selector
│   │   └── search/         # Search input
│   ├── hooks/
│   │   ├── useCart.js      # Cart state management
│   │   └── useFetchData.js # API data fetching
│   ├── App.jsx             # Root with Outlet
│   ├── main.jsx            # Entry point
│   ├── routes.jsx          # Route configuration
│   └── ErrorPage.jsx       # Error boundary
├── tests/
│   └── setup.js            # Test configuration
└── package.json
```

## Data Flow Diagram

```
App Component
    ├── useFetchData() → { data, loading, error }
    └── useCart() → { cart, addToCart, removeFromCart }
         │
         └── Outlet context provider
              │
              ├── Catalogue (consumes data, addToCart)
              ├── Product (consumes data, addToCart)
              ├── Cart (consumes data, cart, removeFromCart)
              └── CartItem (consumes removeFromCart, setItemCount)
```

## Testing Summary

| Test Type   | Library         | Purpose                    |
| ----------- | --------------- | -------------------------- |
| Component   | Testing Library | Render + user interactions |
| Unit        | Vitest          | Isolated function testing  |
| Mocking     | vi.mock()       | Simulate dependencies      |
| User Events | userEvent       | Simulate clicks/typing     |
| Assertions  | jest-dom        | Custom DOM matchers        |

## What I learned

### React Router

- **createBrowserRouter** - Sets up client-side routing
- **Nested Routes** - Layout components with `<Outlet />`
- **Dynamic Segments** - `:id` and `:category` parameters
- **Catch-All** - `errorElement` for route errors
- **Outlet Context** - Pass data to child routes

### Data Fetching

- **Custom Hooks** - Encapsulate fetch logic
- **Lifting Requests** - Fetch once at top level
- **Error Handling** - Show user-friendly errors
- **Loading States** - Show spinners during fetch

### Testing

- **Mock Functions** - `vi.fn()` for callbacks
- **Mock Components** - Simplify complex children
- **Mock Hooks** - Control hook return values
- **User Events** - Async interactions
- **Cleanup** - Automatic after each test

### Styling Approaches

- **CSS Modules** - Scoped, predictable, no conflicts
- **CSS-in-JS** - Dynamic styles, theming
- **Utility Frameworks** - Rapid development
- **Component Libraries** - Pre-built accessible components

