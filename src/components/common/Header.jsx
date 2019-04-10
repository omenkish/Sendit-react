import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import MenuDropdown from "./MenuDropdown.jsx";
import { isLoggedIn, logout } from "../../services/authService";
import styles from "../../assets/css/index.css";

const Header = () => {
  return (
    <header>
      <div>
        <div id={styles.branding}>
          <NavLink to="/" className={styles.brand}>
            <h1>
              <span className={styles.highlight}>Send</span>IT{" "}
              <i className="fa fa-shipping-fast" />
            </h1>
          </NavLink>
        </div>
        <nav>
          <ul id={styles.navbar}>
            {isLoggedIn() && (
              <Fragment>
                <li className=""><MenuDropdown /></li>
                <li>
                  <NavLink
                    to="/dashboard"
                    activeClassName={styles.current}
                    exact
                  >
                    Dashboard <i className="fa fa-lock" />
                  </NavLink>
                </li>
                <li style={{ cursor: "pointer" }} onClick={() => logout()}>
                  Logout <i className="fa fa-power-off" />
                </li>
              </Fragment>
            )}

            {!isLoggedIn() && (
              <Fragment>
                <li>
                  <NavLink to="/login" activeClassName={styles.current}>
                    Login <i className="fa fa-sign-in-alt" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" activeClassName={styles.current}>
                    Register <i className="fa fa-user-plus" />
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
