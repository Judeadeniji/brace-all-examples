import { AddToCartEventHandler } from "./services/event-service"

// we need a listener, this can be placed anywhere throughout the app
export function AddToCartlistener(event) {
  // get the product from event detail
  const product = event.detail.product;
  // get the cart items from the event detail
  const cartItems = event.detail.items;
  cartItems.update((prevItems) => [...prevItems, product]);
}


function Product({ product }) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" on:click={() => AddToCartEventHandler(product)}> Add to Cart </button>
    </div>
  );
}

export default Product