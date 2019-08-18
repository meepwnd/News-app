import React, { useState } from "react";
import { signUp } from "../actions/actions";
import { connect } from "react-redux";

const SignupPage = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = () => {
    if (email && password && name) {
      return false;
    }
    return true;
  };

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    };
    try {
      props.signUp(user, () => {props.history.push("/news");});
      
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h3>You can use fake email</h3>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
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
        <button className="btn-submit" disabled={isDisabled()}>Send</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { signUp }
)(SignupPage);
