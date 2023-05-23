import { For, createData } from "brace-jsx";

function Cart({ items, onRemoveItem }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium mb-4">Cart</h2>
      <ul className="mb-4">
        <For each={items}>
        {(item) => (
          <li key={{id: items.id}} className="flex justify-between">
            <span>{item.name}</span>
            <button
              className="text-red-500 hover:text-red-600"
              on:click={() => onRemoveItem(item)}
            >
              Remove
            </button>
          </li>
        )}
       </For>
      </ul>
      <p className="text-gray-500">Total: ${String(total)}</p>
    </div>
  );
}

export default Cart;
