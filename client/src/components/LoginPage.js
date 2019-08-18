import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions/actions";

const LoginPage = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = () => {
    if (email && password) {
      return false;
    }
    return true;
  };

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
      email,
      password
    };
    props.login(user, () => {
      props.history.push("/news");
    });
  };
 
  return (
    <div className="container">
      <h3>Please Provide Your Email and Password</h3>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Set password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn-submit" disabled={isDisabled()}>
          Send
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.user.error
})

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
