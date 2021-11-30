import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getTokenData, hasAnyRoles, isAuthenticated } from "../../utils/requests";
import { removeSidebarExpand, sidebarExpand } from "../../utils/sidebar";


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
          <div className="sidebar-bg-close" id="sbgc"  onClick={sidebarExpand}></div>
          <div className="sidebar shadow" id="sidebar">

            <div className="sidebar-logo-container">
              <Link to="/dashboard">
                System CRM
              </Link>
            </div>

            <div className="sidebar-link-container">

              <NavLink to="/dashboard" activeClassName="sidebar-link-active" onClick={removeSidebarExpand}>
                <div className="sidebar-nav-icon ">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="sidebar-nav-textlink">
                  Dashboard
                </div>
              </NavLink>

              {hasAnyRoles(['ROLE_ADMIN']) && (
                <NavLink to="/usuarios" activeClassName="sidebar-link-active" onClick={removeSidebarExpand}>
                  <div className="sidebar-nav-icon ">
                    <i className="fas fa-users-cog"></i>
                  </div>
                  <div className="sidebar-nav-textlink">
                    Usuários
                  </div>
                </NavLink>
              )}

              {hasAnyRoles(['ROLE_OPERATOR']) && (
                <NavLink to="/clientes" activeClassName="sidebar-link-active" onClick={removeSidebarExpand}>
                  <div className="sidebar-nav-icon ">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="sidebar-nav-textlink">
                    Clientes
                  </div>
                </NavLink>
              )}

              
              <NavLink to="/produtos" activeClassName="sidebar-link-active" onClick={removeSidebarExpand}>
                <div className="sidebar-nav-icon ">
                  <i className="fas fa-th-large"></i>
                </div>
                <div className="sidebar-nav-textlink">
                  Produtos
                </div>
              </NavLink>
              

              <NavLink to="/perfil" activeClassName="sidebar-link-active" onClick={removeSidebarExpand}>
                <div className="sidebar-nav-icon ">
                  <i className="fas fa-user-cog"></i>
                </div>
                <div className="sidebar-nav-textlink">
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