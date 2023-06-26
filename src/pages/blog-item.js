import { Link } from "brace-jsx/router";

// BlogPostComponent
const BlogPostComponent = ({ params, data }) => {
  const { slug } = params;
  const { title, date, author, content } = data;

  return (
    <div className="container mx-auto py-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 text-sm mb-2">
          By {author} | {date.toLocaleDateString()}
        </p>
        <div className="mb-8">
          <p className="px-2 mt-2">{content}</p>
        </div>
        <Link to="/blog" className="text-blue-500 hover:underline">
          Go back to Blog
        </Link>
      </article>
    </div>
  );
};

export default BlogPostComponent;