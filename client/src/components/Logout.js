import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/actions";

const Logout = ({ token, logout }) => {
  return <button onClick={() => logout(token)} className="btn-logout">Log out</button>;
};

const mapStateToProps = state => ({
  token: state.user.data.token || ""
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
