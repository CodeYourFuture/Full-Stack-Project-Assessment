export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://video-storage.onrender.com"
    : "http://localhost:5000";
