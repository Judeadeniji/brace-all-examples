import './index.css'
import { Mount, createData } from "brace-jsx"
import { createRouter, RouteOutlet, navigate, Location, Link, beforeRoute } from "brace-jsx/router"
const { getCurrentPath } = Location();
const cPath = createData('/');
const showSideBar = createData(false);


// NavLink Component
function NavLink({ children, to, activeClassName }) {
    cPath.set(getCurrentPath(), { silent: true });
  const isActive = cPath.value.replace('/brace-router', "") === to;

  return (
    <a
      class={`flex items-center px-1 py-2 rounded-md mb-2 text-center mx-auto ${
        isActive ? activeClassName : "text-gray-600 hover:bg-gray-100"
      }`}
      href={to}
      click$={ async (e) => {
        e.preventDefault();
        await navigate(to);
      }}
    >
      {children}
    </a>
  );
}

// Sidebar Component
const Sidebar = ({ class: className }) => {
  return (
    <div class={`bg-gray-200 w-full sm:h-32 md:h-screen md:w-1/3 ${className}`}>
      <ul class="sm:flex sm:justify-between sm:items-center md:block py-6 mx-auto">
        <li>
          <NavLink to="/" activeClassName="bg-orange-500 text-white font-bold">
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
          <NavLink to="/delayed" activeClassName="bg-orange-500 text-white font-bold">
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
            Delayed Route
          </NavLink>
        </li>
        <li>
          <NavLink to="/light-dark/sun" activeClassName="bg-orange-500 text-white font-bold">
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
            Invalid Route
          </NavLink>
        </li>
        <li>
          <NavLink to="/light-dark" activeClassName="bg-orange-500 text-white font-bold">
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
            Example App
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" activeClassName="bg-orange-500 text-white font-bold">
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
          <NavLink to="/products" activeClassName="bg-orange-500 text-white font-bold">
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
            activeClassName="bg-orange-500 text-white font-bold"
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
          <NavLink to="/blog" activeClassName="bg-orange-500 text-white font-bold">
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
            activeClassName="bg-orange-500 text-white font-bold"
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

const Header = ({ children }) => {
  return (
   <header class="w-full sm:mb-1 relative bg-orange-500 md:hidden">
     <div class="w-full flex justify-end items-center pr-3 py-2">
      <button class="bg-white rounded-md px-3 py-2 my-auto text-black
      hover:shadow font-bold" click$={() =>
      showSideBar.update(show => !show)}>Menu</button>
     </div>
      <nav class={showSideBar.value ? "block" : "hidden"}>
      {children}
      </nav>
   </header>
    )
}

// Layout Component
const Layout = () => {
  return (
    <div class="md:flex">
      <Header>
       <Sidebar class="mt-2" />
      </Header>
       <Sidebar class="hidden md:block" />
      <div class="md:px-8 py-6 md:flex-1 h-screen relative">
        <RouteOutlet />
      </div>
    </div>
  );
};

// fake a dynamic import
 const fakeDynamicImport = async (modulePath) => {
  // Simulate the asynchronous behavior of a dynamic import
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Simulate the resolved module value
  const moduleValue = {
    default: (props) => <h1 key={{}} class="text-4xl font-extrabold mx-3 my-1
    text-center h-screen">I knew You Waited hard for me</h1>
  };

  return moduleValue;
}

const blogPost = {
  title: '10 Reasons Why you should Use BraceJs',
  date: new Date(),
  author: 'Apex',
  content: <p>Blog post</p> /*(
    <div>
    <p class="mb-4">BraceJs is a modern client-side JavaScript framework that offers developers great flexibility, high speed, and an easy syntax. In this blog post, we will explore ten compelling reasons why you should consider using BraceJs for your next web development project.</p>

    <ol class="list-decimal list-inside mb-4">
      <li class="mb-2">Easy Learning Curve: BraceJs has a gentle learning curve, making it accessible for both beginners and experienced developers.</li>
      <li class="mb-2">Lightweight and Fast: BraceJs is designed to be lightweight, resulting in faster load times and improved performance.</li>
      <li class="mb-2">Component-Based Architecture: BraceJs follows a component-based architecture, enabling modular and reusable code development.</li>
      <li class="mb-2">Reactive Data Binding: BraceJs provides reactive data binding, allowing automatic UI updates when data changes.</li>
      <li class="mb-2">Rich UI Libraries: BraceJs offers a wide range of UI libraries and components, making it easier to create beautiful and interactive user interfaces.</li>
      <li class="mb-2">Extensive Documentation: BraceJs has comprehensive documentation, tutorials, and examples, making it easier to get started and find answers to your questions.</li>
      <li class="mb-2">Flexibility and Customization: BraceJs provides a flexible and customizable development environment, allowing you to tailor the framework to your specific needs.</li>
      <li class="mb-2">Robust Ecosystem: BraceJs has a thriving ecosystem with a large community and a rich collection of plugins and extensions.</li>
      <li class="mb-2">Excellent Performance: BraceJs is known for its excellent performance, ensuring smooth and responsive web applications.</li>
      <li class="mb-2">Active Development and Support: BraceJs is actively maintained and supported, with regular updates and bug fixes.</li>
    </ol>

    <p class="mb-4">BraceJs combines the best of both React and Svelte. It provides a familiar component-based architecture similar to React, allowing you to build reusable and composable UI components. However, BraceJs introduces a syntax inspired by Svelte, which offers a more concise and intuitive way to define components and handle reactive data bindings.</p>

    <p class="mb-4">By combining the power of React and the simplicity of Svelte-like syntax, BraceJs empowers developers to create highly performant and maintainable web applications.</p>

    <p class="mb-4">Whether you're a beginner or an experienced developer, BraceJs can be an excellent choice for building modern web applications. Its flexibility, speed, and easy syntax make it a powerful tool in your development arsenal.</p>
    </div>
  )*/,
  meta: {}
};



beforeRoute(async (props) => {
  const loader = document.createElement('div');
  loader.setAttribute('class', 'loader');
  document.body.appendChild(loader);

  let currentWidth = 0;
  const targetWidth = window.innerWidth; // Get the width of the viewport

  const animationDuration = 2000; // Animation duration in milliseconds
  const animationInterval = 10; // Interval between width increments in milliseconds
  const increment = targetWidth / (animationDuration / animationInterval); // Calculate the width increment

  const animationIntervalId = setInterval(() => {
    currentWidth += increment;
    loader.style.width = `${currentWidth}px`;
  }, animationInterval);

  await new Promise((resolve) => setTimeout(resolve, animationDuration+50));
  
    props.resolve(() => {
    clearInterval(animationIntervalId);
    document.body.removeChild(loader);
    if (props.nextRoute.includes("/blog/")) {
      return blogPost
    }
  });
});


const routes = [
  {
    path: "",
    component: () => import(/* webpackPrefetch: true */'./pages/dashboard'),
  },
  {
    path: "/light-dark",
    component: () => import('./components/Lighthouse'),
  },
  {
    path: "/dashboard/[id]",
    component: () => import('./pages/dashboard-item'),
  },
  {
    path: "/task",
    component: () => import('./pages/task'),
  },
  {
    path: "/products",
    component: () => import('./pages/products'),
  },
  {
    path: "/products/[category]/[id]",
    component: () => import('./pages/products-item'),
  },
  {
    path: "/blog",
    component: () => import('./pages/blog'),
  },
  {
    path: "/blog/[slug]",
    component: () => import('./pages/blog-item'),
  },
  {
    path: "/[...slug]",
    component: () => import("./App"),
  },
  {
    path: "/delayed",
    component: () => fakeDynamicImport('./fakePath'),
  },
];

createRouter(routes, "/brace-router")

Mount(() => <Layout />,
document.querySelector("#root"));