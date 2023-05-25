import { Link } from "brace-jsx/router";

const DynamicPageComponent = (props) => {
  const slug = props.params['...slug'];
  return (
    <div class="py-4 h-full" key={{}}>
      <h1 class="text-2xl font-bold">Dynamic Page Component - Slug: {slug}</h1>
      <Link to="/" class="text-blue-500 hover:underline">
        Go to Dashboard
      </Link>
    </div>
  );
};


export default DynamicPageComponent