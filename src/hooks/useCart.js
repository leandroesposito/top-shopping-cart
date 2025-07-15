import { useState } from "react";

function useCart() {
  const [cart, setCart] = useState({});

  function getCart() {
    return { ...cart };
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

  return { getCart, getTotalItems, addToCart, setItemCount };
}

export default useCart;
