import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../AuthContext";
import { getTokenData, isAuthenticated, removeAuthData } from "../../utils/requests";


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
        <div className="header">
          <div className="header-logo-container">
            <a href="#link">
              <strong>System CRM</strong>
            </a>
          </div>
          <div className="header-btn-menu-expand-container">
            <i className="fas fa-bars"    ></i>
          </div>
          <div className="dropdown ml-auto">
            <button className="btn btn-sm p-0 text-dark shadow-none dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-expanded="false">
              <span className="header-username">usuario_logado@systemcrm.com.br</span>
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