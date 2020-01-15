import React, { useState, useEffect } from "react";
import { signUp } from "../actions/actions";
import { connect } from "react-redux";

const SignupPage = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (props.error && props.error.includes("email_1")) {
      setEmailError('This email is already used');
      setNameError('');
    } else if (props.error && props.error.includes("name_1")) {
      setNameError('This name is already taken');
      setEmailError('');
    } 
  }, [props.error]);

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
      <p>{nameError}</p>
        <input
          autoFocus
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <p>{emailError}</p>
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

const mapStateToProps = state => ({
  error: state.user.error
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignupPage);
