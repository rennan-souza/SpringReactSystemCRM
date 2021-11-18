import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Signin from "./views/Auth/Signin";


const Routes = () => (
  <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Signin />
        </Route>
        <Route path="/">
          <AuthRoutes />
        </Route>
      </Switch>
  </BrowserRouter>
);

export default Routes;