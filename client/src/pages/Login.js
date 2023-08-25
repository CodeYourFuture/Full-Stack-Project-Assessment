import { AppContext } from "../App";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Notification from "../components/Notification";

const schema = yup.object({
    email: yup.string().max(256).email().required().label("Email"),
    password: yup.string().min(3).max(15).required().label("Password")
}).required();

export default function Login() {
    const apiURL = useContext(AppContext);
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        message: "",
        display: false,
        bgColor: ""
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        try {
            const res = await fetch(`${apiURL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
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
        <motion.div
            initial={{ opacity: 0, y: +50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1.5 }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        Email
                        <br />
                        <input
                            id="email"
                            type="text"
                            {...register("email")}
                        />
                    </label>
                    {errors.email?.message && (
                        <div className='cont-invalid'>
                            <span className='invalid-text'>{errors.email?.message}</span>
                        </div>
                    )}
                </div>
                <div>
                    <label>
                        Password
                        <br />
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                    </label>
                    {errors.password?.message && (
                        <div className='cont-invalid'>
                            <span className='invalid-text'>{errors.password?.message}</span>
                        </div>
                    )}
                </div>

                <div>
                    <button className="btn-submit" type="submit">Login</button>
                </div>
                <AnimatePresence>
                    {notification.display && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: "easeOut", duration: 1.5 }}
                            exit={{ opacity: 0 }}
                        >
                            <Notification
                                message={notification.message}
                                bgColor={notification.bgColor}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </motion.div>
    );
}