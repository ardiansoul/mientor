import configEnv from "./config/env-config";
configEnv();

import express, { Express } from "express";
import passport from "passport";
import cors from "cors";
import googleConfig from "./config/google-config";
import routes from "./routes";
import { errorHandler } from "./controllers/helper";
import cookieParser from "cookie-parser";
// import { connection } from "./config/database-config";
const app: Express = express();
const PORT = parseInt(process.env.PORT || "4000", 10) || 4000;

passport.use(googleConfig());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent with requests
  })
);

// connection.connect().then(() => {
//   console.log("connect");
// });

app.get("/", (req, res) => {
  res.send("OAuth Service is running");
});

app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`OAuth Service is running on http://localhost:${PORT}`);
});
