import micro_cors from "micro-cors";

const cors = micro_cors({
  origin: "https://studio.apollographql.com",
  allowMethods: ["GET", "POST"],
  allowHeaders: [
    "Access-Control-Allow-Credentials",
    "true",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
  ],
});

export default cors;
