import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/actions";


const Header = ({ userData, logout }) => {
  const token = userData.token;
  const name = userData.user ? userData.user.name : "";
  return (
    <header className="header">
      <nav className="container header__nav">
      <div className="header__links">
        <NavLink exact to="/" className="nav-link" activeClassName="nav-link_active">Home</NavLink>
        <NavLink to="/news" className="nav-link" activeClassName="nav-link_active">News</NavLink>
      </div>

      <div className="header__user">
        <div hidden={!!token}>
          <NavLink exact to="/login" className="auth-link" activeClassName="auth-link_active">Log in</NavLink> or
          <NavLink to="/signup" className="auth-link" activeClassName="auth-link_active">Sign up</NavLink>
        </div>

        <div hidden={!token}>
          Hi, {name}
          <button onClick={() => logout(token)} className="btn-logout">Log out</button>
        </div>
      </div>
      </nav>
      
    </header>
  );
};

const mapStateToProps = state => ({
  userData: state.user.data || {}
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
