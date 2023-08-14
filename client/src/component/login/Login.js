import React, { useState } from "react";
import '../login/login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const clickHandler = (e) => setEmail(email);

  return (
    <div
      className="login-div">
      <h1>Login</h1>
      <div className="login-box">
        <form>
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
              LOGIN
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;