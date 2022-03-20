import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Footer from "components/Footer";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthProvider";
import Tables from "./pages/Tables";
import {
  DashboardRoute,
  AccountsRoute,
  EditAccountRoute,
  DetailsAccountRoute,
} from "routes/PageRoutes";
import EditAccount from "pages/EditAccount";
import AccountDetail from "pages/AccountDetail";
import { DeleteAccountRoute } from "routes/PageRoutes";
import DeleteAccount from "pages/DeleteAccount";
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
function _Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path={DashboardRoute} component={Dashboard} />
          <Route exact path={AccountsRoute} component={Tables} />
          <Route path={EditAccountRoute} component={EditAccount} />
          <Route path={DetailsAccountRoute} component={AccountDetail} />
          <Route path={DeleteAccountRoute} component={DeleteAccount} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </div>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={_Dashboard} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
