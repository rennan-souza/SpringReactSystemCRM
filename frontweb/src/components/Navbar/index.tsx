import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../AuthContext";
import { getAuthData, getTokenData, isAuthenticated, removeAuthData } from "../../utils/requests";
import { sidebarExpand } from "../../utils/sidebar";


const Navbar = () => {

  const history = useHistory();
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        autheticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        autheticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      autheticated: false,
    });
    history.replace('/');
  };

  return (
    <>
      {authContextData.autheticated ? (
        <div className="header border-bottom" id="header">
     
          <i className="fas fa-bars btn-sidebar-expand" onClick={sidebarExpand}></i>
         
          <div className="dropdown ml-auto">
            <button className="btn btn-sm p-0 text-dark shadow-none dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-expanded="false">
              <span className="header-username">
              {getAuthData().userFirstName} {getAuthData().userLastName} <br /> {getTokenData()?.user_name} 
              </span>
              <span className="header-username-icon"><i className="fas fa-user-circle"></i></span>
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#link" onClick={handleLogoutClick}>
                <i className="fas fa-sign-out-alt mr-2"></i>
                SAIR
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Navbar;