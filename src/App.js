import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Dashboard from "pages/Dashboard";
import Tables from "pages/Tables";
import Footer from "components/Footer";
import {DashboardRoute, AccountsRoute, EditAccountRoute, DetailsAccountRoute} from "routes/PageRoutes";

// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
import EditAccount from "pages/EditAccount";
import AccountDetail from "pages/AccountDetail";

function App() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path={DashboardRoute} component={Dashboard} />
          <Route exact path={AccountsRoute} component={Tables} />
          <Route path={EditAccountRoute} component={EditAccount} />
          <Route path={DetailsAccountRoute} component={AccountDetail} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
