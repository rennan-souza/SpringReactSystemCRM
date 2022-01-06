import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import Recover from "./views/Auth/Recover";
import Reset from "./views/Auth/Reset";
import Signin from "./views/Auth/Signin";


const Routes = () => (
  <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Signin />
        </Route>
        <Route path="/esqueci-minha-senha" exact>
          <Recover />
        </Route>
        <Route path="/criar-nova-senha" exact>
          <Reset />
        </Route>
        <Route path="/">
          <AuthRoutes />
        </Route>
      </Switch>
  </BrowserRouter>
);

export default Routes;