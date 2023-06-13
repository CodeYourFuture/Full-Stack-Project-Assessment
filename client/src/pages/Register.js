import { AppContext } from "../App";
import { useState, useContext } from "react";

export default function Register() {
    const apiURL = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>
                    Email
                    <br />
                    <input id="email" type="text" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
                </label>
            </div>

            <div>
                <label>
                    Password
                    <br />
                    <input id="password" type="text" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
                </label>
            </div>

            <div>
                <button className="btn-submit" type="submit">Register</button>
            </div>
        </form>
    );
}