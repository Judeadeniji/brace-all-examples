import { createCustomEvent, emit, destroy } from "brace-jsx/event-context";
import { cartItems } from "../App"

function handleAddToCart(event) {
  const product = event.detail.product;
  cartItems.update((prevItems) => [...prevItems, product]);
}

function handleRemoveItem(event) {
  const item = event.detail.item;
  cartItems.update((prevItems) => prevItems.filter((i) => i.id !== item.id));
}

export function AddToCartEventHandler(product) {
  // Create the event context
  createCustomEvent('add-to-cart', handleAddToCart);
  
  // emit the event
  emit('add-to-cart', product);
  
  // destroy the event as it's no longer needed
  destroy('add-to-cart', handleAddToCart)
}