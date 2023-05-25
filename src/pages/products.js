import { Link } from "brace-jsx/router"

// ProductsComponent
const ProductsComponent = () => {
  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">Products Component</h1>
      <p>Explore our wide range of products. Click on a product to view its details.</p>
      <Link to="/products/category/id" class="text-blue-500 hover:underline">
        Go to Product Detail
      </Link>
    </div>
  );
};

export default ProductsComponent