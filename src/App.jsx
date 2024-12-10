import "./styles/App.css";
import { UsersTable } from "./components/users/users-table";
import { ApplicationLayout } from "./components/layout/layout";

const App = () => {
  return (
    <ApplicationLayout>
      <UsersTable />
    </ApplicationLayout>
  );
};

export default App;
