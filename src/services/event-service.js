import { createCustomEvent, emit, destroy } from "brace-jsx/event-context";
import { AddToCartlistener } from "../Product"
import { RemoveFromCartlistener } from "../Cart"
// cartItems is imported so that it can be used in the handlers
import { cartItems } from "../App"

export function AddToCartEventHandler(product) {
  // Create the event context using the listener
  createCustomEvent('add-to-cart', AddToCartlistener);
  
  // emit the event
  // pass the item and current items
  emit('add-to-cart', {product, items: cartItems});
  
  // destroy the event as it's no longer needed
  destroy('add-to-cart', AddToCartlistener)
}

export function RemoveFromCartEventHandler(item) {
  // Create the event context using the listener
  createCustomEvent('remove-from-cart', RemoveFromCartlistener);
  
  // emit the event
  // pass the item and current items
  emit('remove-from-cart', {item, items: cartItems});
  
  // destroy the event as it's no longer needed
  destroy('remove-from-cart', RemoveFromCartlistener)
}