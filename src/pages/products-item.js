import { Link } from "brace-jsx/router"

// ProductDetailComponent
const ProductDetailComponent = (props) => {
  const { category, id } = props.params;
  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">
        Product Detail Component - Category: {category}, ID: {id}
      </h1>
      <p>This is the detailed view of a product in the {category} category with ID: {id}. Get all the information about the product here.</p>
      <Link to="/products" class="text-blue-500 hover:underline">
        View All Products
      </Link>
    </div>
  );
};

export default ProductDetailComponent