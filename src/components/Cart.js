import { For, createData } from "brace-jsx";
import { RemoveFromCartEventHandler } from "./services/event-service";

// we need a listener, this can be placed anywhere throughout the app
export function RemoveFromCartlistener(event) {
  // get the product from event detail
  const item = event.detail.item;
  // get the cart items from the event detail
  const cartItems = event.detail.items;
  cartItems.update((prevItems) => prevItems.filter((i) => i.id !== item.id));
}


function Cart({ items }) {
  const total = items().reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium mb-4">Cart</h2>
      <ul className="mb-4">
        <For each={items()}>
        {(item) => (
          <li key={{id: items.id}} className="flex justify-between">
            <span>{item.name}</span>
            <button className="text-red-500 hover:text-red-600" on:click={() => RemoveFromCartEventHandler(item)}> Remove </button>
          </li>
        )}
       </For>
      </ul>
      <p className="text-gray-500">Total: ${String(total)}</p>
    </div>
  );
}

export default Cart;