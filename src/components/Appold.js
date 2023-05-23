import { createData, If, For } from "brace-jsx";
import Cart from "./Cart";
import Product from "./Product";

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

// cartItems is exported as it can be used as a shared but centralized state
export const cartItems = createData([]);

function App() {
  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <For each={products}>
          {(product) => (
            <Product key={product.id} product={product} />
          )}
        </For>
      </div>
     <If eval={cartItems().length > 0}>
        <div className="mt-4">
          <Cart items={cartItems} />
        </div>
     </If>
    </div>
  );
}

export default App;