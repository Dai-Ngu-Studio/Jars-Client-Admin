import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Footer from "components/Footer";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthProvider";
import Table from "./pages/Tables";
// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
function _Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path="/">
            <Redirect to="/overview" />
          </Route>
          <Route component={Dashboard} path="/overview" />
          <Route component={Table} path="/table" />
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
