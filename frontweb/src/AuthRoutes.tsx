import { Redirect, Switch } from "react-router";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import CustomerEdit from "./views/Customer/CustomerEdit";
import CustomerList from "./views/Customer/CustomerList";
import CustomerRegister from "./views/Customer/CustomerRegister";
import Dashboard from "./views/Dashboard";
import UserEdit from "./views/User/UserEdit";
import UserList from "./views/User/UserList";
import UserRegister from "./views/User/UserRegister";



const AuthRoutes = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content" id="content">
        <Switch>
          
          <Redirect from="/" to="/dashboard" exact />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <Redirect from="/usuarios" to="/usuarios/lista" exact />
          <PrivateRoute path="/usuarios/lista">
            <UserList />
          </PrivateRoute>
          <PrivateRoute path="/usuarios/cadastrar">
            <UserRegister />
          </PrivateRoute>
          <PrivateRoute path="/usuarios/editar/:userId">
            <UserEdit />
          </PrivateRoute>

          <Redirect from="/clientes" to="/clientes/lista" exact />
          <PrivateRoute path="/clientes/lista">
            <CustomerList />
          </PrivateRoute>
          <PrivateRoute path="/clientes/cadastrar">
            <CustomerRegister />
          </PrivateRoute>
          <PrivateRoute path="/clientes/editar/:customerId">
            <CustomerEdit />
          </PrivateRoute>

        </Switch>
      </div>
    </>
  )
}

export default AuthRoutes;