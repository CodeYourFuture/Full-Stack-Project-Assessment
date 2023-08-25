import { AppContext } from "../App";
import { useContext } from "react";
import { motion } from "framer-motion";
import jwt from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  url: yup.string().min(3).max(100).required()
    .matches(/youtube\.com\/watch\?v=[^&]+$/, 'Video URL must be valid.').label("Video URL")
}).required();

export default function AddVideo({ addVideo }) {
  const apiURL = useContext(AppContext);

  const token = localStorage.getItem("token");
  const { uId } = jwt(token);

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
      const res = await fetch(`${apiURL}/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ userId: uId, ...formData })
      });

      const data = await res.json();

      if (res.status === 200) {
        setValue('url', '');
        addVideo(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
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
              placeholder="youtube.com/watch?v=w5i-x8QRCSg"
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
          <button className="btn-submit" type="submit">Add</button>
        </div>
      </form>
    </motion.div>
  );
}