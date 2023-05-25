import { Link } from "brace-jsx/router"

// DashboardItemComponent
const DashboardItemComponent = ({ params }) => {
  const { id } = params;
  return (
    <div key={{}} class="h-full">
      <h1 class="text-2xl font-bold">Dashboard Item Component - ID: {id}</h1>
      <p>This is the detail view of Dashboard Item with ID: {id}. You can view and edit the item's information here.</p>
      <Link title="Dashboard" to="/" class="text-blue-500 hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default DashboardItemComponent