import "./Login.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("Registered Successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode);
        // ..
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user ? navigate("/videos") : alert("Login Failed");
        // console.log(user);
        // alert("Login Successfully");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode);
      });
  }

  function handleLogin(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
        <legend>Login to your account</legend>
        <label htmlFor="email" className="login-form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="login-form-input"
        />

        <label htmlFor="password" className="login-form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="form-input"
        />
        <button onClick={register} className="register-btn">
          Register
        </button>
        <button className="login-form-btn" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};
