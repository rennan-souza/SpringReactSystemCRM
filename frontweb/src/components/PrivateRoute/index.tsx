import { Redirect, Route } from 'react-router-dom';
import { Role } from '../../types';
import { hasAnyRoles, isAuthenticated } from '../../utils/requests';


type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? (
          <Redirect to="/" />  
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;