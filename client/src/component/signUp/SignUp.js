import React, { useState } from "react";
import "./signUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (e) => setName(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const clickHandler = (e) => setEmail(email);

  return (
    <div className="sign-div">
      <h1>Sign up</h1>

      <div className="login-box">
        <form>
          <div className="user-box">
            <input type="text" onChange={nameHandler} value={name} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="email" onChange={emailHandler} value={email} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={passwordHandler}
              value={password}
            />
            <label>Password</label>
          </div>
          <center>
            <button className="btn-submit" onCanPlay={clickHandler}>
              SUBMIT
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
