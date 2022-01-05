import { Redirect, Switch } from "react-router";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Signin from "./views/Auth/Signin";
import CustomerEdit from "./views/Customer/CustomerEdit";
import CustomerList from "./views/Customer/CustomerList";
import CustomerRegister from "./views/Customer/CustomerRegister";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/Error/404";
import ProductEdit from "./views/Product/ProductEdit";
import ProductList from "./views/Product/ProductList";
import ProductRegister from "./views/Product/ProductRegister";
import ChangePassword from "./views/Profile/ChangePassword";
import ProfileData from "./views/Profile/ProfileData";
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
          <PrivateRoute path="/usuarios/lista" roles={['ROLE_ADMIN']}>
            <UserList />
          </PrivateRoute>
          <PrivateRoute path="/usuarios/cadastrar" roles={['ROLE_ADMIN']}>
            <UserRegister />
          </PrivateRoute>
          <PrivateRoute path="/usuarios/editar/:userId" roles={['ROLE_ADMIN']}>
            <UserEdit />
          </PrivateRoute>

          <Redirect from="/clientes" to="/clientes/lista" exact />
          <PrivateRoute path="/clientes/lista" roles={['ROLE_OPERATOR']}>
            <CustomerList />
          </PrivateRoute>
          <PrivateRoute path="/clientes/cadastrar" roles={['ROLE_OPERATOR']}>
            <CustomerRegister />
          </PrivateRoute>
          <PrivateRoute path="/clientes/editar/:customerId" roles={['ROLE_OPERATOR']}>
            <CustomerEdit />
          </PrivateRoute>

          <Redirect from="/produtos" to="/produtos/lista" exact />
          <PrivateRoute path="/produtos/lista">
            <ProductList />
          </PrivateRoute>
          <PrivateRoute path="/produtos/cadastrar">
            <ProductRegister />
          </PrivateRoute>
          <PrivateRoute path="/produtos/editar/:productId">
            <ProductEdit />
          </PrivateRoute>

          <Redirect from="/perfil" to="/perfil/dados" exact />
          <PrivateRoute path="/perfil/dados">
            <ProfileData />
          </PrivateRoute>
          <PrivateRoute path="/perfil/mudar-senha">
            <ChangePassword />
          </PrivateRoute>

          <PrivateRoute path="*">
            <NotFound />
          </PrivateRoute>
        </Switch>
      </div>
    </>
  )
}

export default AuthRoutes;