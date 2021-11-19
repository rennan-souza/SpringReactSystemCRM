import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getTokenData, hasAnyRoles, isAuthenticated } from "../../utils/requests";
import { sidebarExpand } from "../../utils/sidebar";


const Sidebar = () => {

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

  return (
    <>
      {authContextData.autheticated ? (
        <>
          <div className="sidebar-background-close" id="sidebarContainerClose"  onClick={sidebarExpand}></div>
          <div className="sidebar shadow-sm" id="sidebar">
            <div className="sidebar-links-container">

              <NavLink to="/dashboard" activeClassName="sidebar-link-active">
                <div className="sidebar-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="sidebar-link-text">
                  Dashboard
                </div>
              </NavLink>

              {hasAnyRoles(['ROLE_ADMIN']) && (
                <NavLink to="/usuarios" activeClassName="sidebar-link-active">
                  <div className="sidebar-link-icon">
                    <i className="fas fa-users-cog"></i>
                  </div>
                  <div className="sidebar-link-text">
                    Usuários
                  </div>
                </NavLink>
              )}

              {hasAnyRoles(['ROLE_OPERATOR']) && (
                <NavLink to="/clientes" activeClassName="sidebar-link-active">
                  <div className="sidebar-link-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="sidebar-link-text">
                    Clientes
                  </div>
                </NavLink>
              )}

              {/** 
              <a href="#link">
                <div className="sidebar-link-icon">
                  <i className="fas fa-th-large"></i>
                </div>
                <div className="sidebar-link-text">
                  Produtos
                </div>
              </a>
              */}

              <NavLink to="/perfil" activeClassName="sidebar-link-active">
                <div className="sidebar-link-icon">
                  <i className="fas fa-user-cog"></i>
                </div>
                <div className="sidebar-link-text">
                  Meus dados
                </div>
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default Sidebar;