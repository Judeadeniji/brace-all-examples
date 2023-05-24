import './index.css'
import { Mount, createData } from "brace-jsx"
import { createRouter, RouteOutlet, navigate, Location, Link } from "brace-jsx/router"
import App from "./App";
import LoginForm from "./components/login";
import Counter from "./components/counter";
import Bulb from "./components/Lighthouse";
const { getCurrentPath } = Location();

const cPath = createData('/') 

// NavLink Component
function NavLink({ children, to, activeClassName }) {
  if(getCurrentPath() !== cPath.value) {
    cPath.set(getCurrentPath());
  }
  const isActive = cPath.value === to;

  return (
    <a
      class={`flex items-center px-1 py-2 rounded-md mb-2 text-center mx-auto ${
        isActive ? activeClassName : "text-gray-600 hover:bg-gray-100"
      }`}
      href={to}
      click$={(e) => {
        e.preventDefault();
        navigate(to);
        cPath.set(to)
      }}
    >
      {children}
    </a>
  );
}

// Sidebar Component
const Sidebar = () => {
  return (
    <div class="bg-gray-200 h-screen w-1/3">
      <ul class="py-6 mx-auto">
        <li>
          <NavLink to="/" activeClassName="bg-blue-500 text-white font-bold">
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-7.5h2v-5h-2v5zm0 4h2v-2h-2v2z"
                />
              </svg>
            </span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" activeClassName="bg-blue-500 text-white font-bold">
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6H4V4h16v2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zM4 20h16v-2H4v2z"
                />
              </svg>
            </span>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" activeClassName="bg-blue-500 text-white font-bold">
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6H4V4h16v2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zM4 20h16v-2H4v2z"
                />
              </svg>
            </span>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products/wears/654"
            activeClassName="bg-blue-500 text-white font-bold"
          >
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6H4V4h16v2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zM4 20h16v-2H4v2z"
                />
              </svg>
            </span>
            Product Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" activeClassName="bg-blue-500 text-white font-bold">
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H5v-2h14v2zm0-4H5v-2h14v2zm0-4H5V8h14v2zm0-4H5V4h14v2z"
                />
              </svg>
            </span>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/this-is-dynamic-route"
            activeClassName="bg-blue-500 text-white font-bold"
          >
            <span class="mr-2">
              <svg
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6H4V4h16v2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2zM4 20h16v-2H4v2z"
                />
              </svg>
            </span>
            Dynamic Route
          </NavLink>
        </li>
        {/* Add other sidebar links */}
      </ul>
    </div>
  );
};

// Layout Component
const Layout = () => {
  return (
    <div class="flex">
      <Sidebar />
      <div class="py-6 px-8 flex-1 bg-gray-100">
        <RouteOutlet />
      </div>
    </div>
  );
};

// DashboardComponent
const DashboardComponent = () => {
  return (
    <div key={{}}>
      <h1 class="text-2xl font-bold">Dashboard Component</h1>
      <p>Welcome to the dashboard! This is the main overview page for your account.</p>
      <Link title="My Account" to="/account" class="text-blue-500 hover:underline">
        Go to Dashboard Items
      </Link>
    </div>
  );
};

// DashboardItemComponent
const DashboardItemComponent = ({ params }) => {
  const { id } = params;

  return (
    <div key={{}}>
      <h1 class="text-2xl font-bold">Dashboard Item Component - ID: {id}</h1>
      <p>This is the detail view of Dashboard Item with ID: {id}. You can view and edit the item's information here.</p>
      <Link title="Dashboard" to="/" class="text-blue-500 hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  );
};

// ProductsComponent
const ProductsComponent = () => {
  return (
    <div key={{}}>
      <h1 class="text-2xl font-bold">Products Component</h1>
      <p>Explore our wide range of products. Click on a product to view its details.</p>
      <Link to="/products/category/id" class="text-blue-500 hover:underline">
        Go to Product Detail
      </Link>
    </div>
  );
};

// ProductDetailComponent
const ProductDetailComponent = ({ params }) => {
  const { category, id } = params;

  return (
    <div key={{}}>
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

// BlogComponent
const BlogComponent = () => {
  return (
    <div key={{}}>
      <h1 class="text-2xl font-bold">Blog Component</h1>
      <p>Read the latest blog posts and stay updated with our informative articles.</p>
      <Link to="/blog/slug" class="text-blue-500 hover:underline">
        Go to Blog Post
      </Link>
    </div>
  );
};

// BlogPostComponent
const BlogPostComponent = ({ params }) => {
  const { slug } = params;

  return (
    <div key={{}}>
      <h1 class="text-2xl font-bold">Blog Post Component - Slug: {slug}</h1>
      <p>This is the blog post with the slug: {slug}. Read and engage with the content.</p>
      <Link to="/blog" class="text-blue-500 hover:underline">
        Go back to Blog
      </Link>
    </div>
  );
};

const DynamicPageComponent = ({ params, ...props }) => {
  const slug = params['...slug'];
  return (
    <div class="py-4" key={{}}>
      <h1 class="text-2xl font-bold">Dynamic Page Component - Slug: {slug}</h1>
      <Link to="/" class="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
};

const routes = [
  {
    path: "/",
    component: DashboardComponent,
  },
  {
    path: "/dashboard/[id]",
    component: DashboardItemComponent,
  },
  {
    path: "/products",
    component: ProductsComponent,
  },
  {
    path: "/products/[category]/[id]",
    component: ProductDetailComponent,
  },
  {
    path: "/blog",
    component: BlogComponent,
  },
  {
    path: "/blog/[slug]",
    component: BlogPostComponent,
  },
  {
    path: "/[...slug]",
    component: DynamicPageComponent,
  },
];

createRouter(routes)

Mount(() => <Layout />,
document.querySelector("#root"));

navigate('/')