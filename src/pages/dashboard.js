import { Link } from "brace-jsx/router";

function Xyz() {
  alert("Dashboard Is Showing")
  return () => {
    alert("Dashboard Is no longer Showing")
  }
}

// EditPostSnippet component
const EditPostSnippet = () => {
  return (
    <div className="dashboard-widget bg-white rounded-lg shadow-lg p-6">
      <i className="bi bi-pencil-fill text-primary text-4xl mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Edit Post</h3>
      <p className="text-gray-500">Manage and update your blog posts easily.</p>
      {/* Add posts preview */}
      <div className="mt-4">
        <h4 className="font-semibold">Posts Preview</h4>
        {/* Add post previews here */}
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Post 1</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Post 2</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Post 3</p>
          </div>
        </div>
      </div>
      <Link to="/edit-post" className="btn-primary mt-6 inline-block px-4 py-2 rounded-lg text-white">
        Go to Edit Post
      </Link>
    </div>
  );
};

// EditProductSnippet component
const EditProductSnippet = () => {
  return (
    <div className="dashboard-widget bg-white rounded-lg shadow-lg p-6 mt-2">
      <i className="bi bi-box-seam text-primary text-4xl mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">Edit Product</h3>
      <p className="text-gray-500">Update and manage your products effortlessly.</p>
      {/* Add products preview */}
      <div className="mt-4">
        <h4 className="font-semibold">Products Preview</h4>
        {/* Add product previews here */}
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Product 1</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Product 2</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Product 3</p>
          </div>
        </div>
      </div>
      <Link to="/edit-product" className="btn-primary mt-6 inline-block px-4 py-2 rounded-lg text-white">
        Go to Edit Product
      </Link>
    </div>
  );
};

// SystemHealthSnippet component
const SystemHealthSnippet = () => {
  return (
    <div className="dashboard-widget bg-white rounded-lg shadow-lg p-6 mt-2">
      <i className="bi bi-heart-fill text-primary text-4xl mb-4"></i>
      <h3 className="text-xl font-semibold mb-2">System Health</h3>
      <p className="text-gray-500">Monitor the health and performance of your system.</p>
      {/* Add site metrics section */}
      <div className="mt-4">
        <h4 className="font-semibold">Site Metrics</h4>
        {/* Add site metrics data */}
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Visitors: 1000</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Page Views: 5000</p>
          </div>
        </div>
        <div className="card mt-2">
          <div className="p-4">
            <p className="text-gray-700">Conversion Rate: 5%</p>
          </div>
        </div>
      </div>
      <Link to="/system-health" className="btn-primary mt-6 inline-block px-4 py-2 rounded-lg text-white">
        Go to System Health
      </Link>
    </div>
  );
};



const DashboardComponent = () => {
  return (
    <div className="container mx-auto px-4 py-8" key="DashboardComponent">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore and manage your account with ease. This comprehensive dashboard provides you with an overview of your account's key information and features.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link to="/account" className="dashboard-link">
          <i className="bi bi-gear-fill mr-2 text-primary"></i> Account Settings
        </Link>
        <Link to="/analytics" className="dashboard-link">
          <i className="bi bi-graph-up mr-2 text-primary"></i> Analytics
        </Link>
        <Link to="/orders" className="dashboard-link">
          <i className="bi bi-cart4 mr-2 text-primary"></i> Orders
        </Link>
        <Link to="/messages" className="dashboard-link">
          <i className="bi bi-envelope-fill mr-2 text-primary"></i> Messages
        </Link>
        <Link to="/reports" className="dashboard-link">
          <i className="bi bi-file-earmark-text-fill mr-2 text-primary"></i> Reports
        </Link>
        <Link to="/notifications" className="dashboard-link">
          <i className="bi bi-bell-fill mr-2 text-primary"></i> Notifications
        </Link>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-8 sm:flex sm:flex-col sm:justify-between sm:items-center">
        <EditPostSnippet />
        <EditProductSnippet />
        <SystemHealthSnippet />
        {/* Additional snippets can be added here */}
      </div>
      <div className="flex justify-center mt-12">
        <Link to="/dashboard" className="btn-primary">
          View Full Dashboard
        </Link>
      </div>
    </div>
  );
};

export default DashboardComponent;
