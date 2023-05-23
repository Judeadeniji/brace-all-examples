function Product({ product, onAddToCart }) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        on:click={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product