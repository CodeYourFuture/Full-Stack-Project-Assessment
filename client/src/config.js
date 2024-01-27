export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://ec2-18-201-166-46.eu-west-1.compute.amazonaws.com:5000"
    : "http://localhost:5000";

// https://video-storage.onrender.com
