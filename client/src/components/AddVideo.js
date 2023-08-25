import { AppContext } from "../App";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jwt from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Notification from "../components/Notification";

const schema = yup.object({
  url: yup.string().min(3).max(100).required()
    .matches(/youtube\.com\/watch\?v=[^&]+$/, 'Video URL must be valid.').label("Video URL")
}).required();

export default function AddVideo({ addVideo }) {
  const apiURL = useContext(AppContext);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

  const [reqInProcess, setReqInProcess] = useState(false);
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
    setReqInProcess(true);

    try {
      const res = await fetch(`${apiURL}/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, ...formData })
      });

      const data = await res.json();

      if (res.status === 200) {
        setValue('url', '');

        addVideo(data);

        setNotification({
          message: 'Video saved.',
          display: true,
          bgColor: "#009379"
        });
      } else {
        setNotification({
          message: 'There was a problem. Maybe the url is invalid.',
          display: true,
          bgColor: "#E2412E"
        });
      }
    } catch (error) {
      setNotification({
        message: 'There was a problem. Maybe the url is invalid.',
        display: true,
        bgColor: "#E2412E"
      });
    } finally {
      setReqInProcess(false);

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
            Video URL
            <br />
            <input
              id="url"
              type="text"
              {...register("url")}
            />
          </label>
          {errors.url?.message && (
            <div className='cont-invalid'>
              <span className='invalid-text'>{errors.url?.message}</span>
            </div>
          )}
        </div>

        <div>
          <button
            className={reqInProcess ? 'btn-submit btn-disabled' : 'btn-submit'}
            type="submit"
            disabled={reqInProcess}
          >Add</button>
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