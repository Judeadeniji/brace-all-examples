import { Link } from "brace-jsx/router";

// BlogComponent
const BlogComponent = () => {
  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">Blog Component</h1>
      <p>Read the latest blog posts and stay updated with our informative articles.</p>
      <Link to="/blog/slug" class="text-blue-500 hover:underline">
        Go to Blog Post
      </Link>
    </div>
  );
};

export default BlogComponent;