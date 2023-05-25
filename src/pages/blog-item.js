import { Link } from "brace-jsx/router";

// BlogPostComponent
const BlogPostComponent = ({ params }) => {
  const { slug } = params;

  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">Blog Post Component - Slug: {slug}</h1>
      <p>This is the blog post with the slug: {slug}. Read and engage with the content.</p>
      <Link to="/blog" class="text-blue-500 hover:underline">
        Go back to Blog
      </Link>
    </div>
  );
};

export default BlogPostComponent