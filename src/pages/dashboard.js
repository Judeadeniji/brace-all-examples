import { Link } from "brace-jsx/router";

// DashboardComponent
const DashboardComponent = () => {
  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">Dashboard Component</h1>
      <p>Welcome to the dashboard! This is the main overview page for your account.</p>
      <Link title="My Account" to="/account" class="text-blue-500 hover:underline">
        Go to Dashboard Items
      </Link>
    </div>
  );
};

export default DashboardComponent;