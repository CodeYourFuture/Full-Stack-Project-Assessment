import { AppContext } from "../App";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

export default function Login() {
    const apiURL = useContext(AppContext);
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        message: "",
        display: false,
        bgColor: ""
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiURL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 200) {
                localStorage.setItem("token", data.token);

                navigate("/videos");
            } else {
                setNotification({
                    message: data.message,
                    display: true,
                    bgColor: "#E2412E"
                });
            }
        } catch (error) {
            setNotification({
                message: error.message,
                display: true,
                bgColor: "#E2412E"
            });
        } finally {
            setTimeout(() => {
                setNotification({
                    message: "",
                    display: false,
                    bgColor: "#E2412E"
                });
            }, 3000);
        }
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
                    <input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
                </label>
            </div>

            <div>
                <button className="btn-submit" type="submit">Login</button>
            </div>
            {notification.display && (
                <Notification
                    message={notification.message}
                    bgColor={notification.bgColor}
                />
            )}
        </form>
    );
}