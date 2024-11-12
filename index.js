import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";

import "./src/config/mongoose.js";
import indexRoute from "./src/routes/route.js";
import globalResponseController from "./src/helpers/Globalresponse.js";
import { shutdown } from "./src/middleware/shutdown.js";

const app = express();

dotenv.config();
app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3000/",
//       "http://localhost:3000/",

//       "http://localhost:3001",
//       "https://eltribo-ruby.vercel.app",
//       "https://eltribo-ruby.vercel.app/",
//       "https://eltribo-ui.vercel.app/",
//       "https://eltribo-ui.vercel.app"
//       ,
//     ],
//     methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "https://vjpenterprises.in",
  "http://vjpenterprises.in",
  "https://www.vjpenterprises.in",
  "http://www.vjpenterprises.in",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://localhost:7000",
  "http://localhost:5173/",
  "http://localhost:5174/",
  "http://127.0.0.1:7000",
  "https://vjp.vercel.app",
  "https://vjp.vercel.app/",

  "http://localhost:3000",
  "http://localhost:3000/",
  "http://localhost:3000/",

  "http://localhost:3001",
  "https://eltribo-ruby.vercel.app",
  "https://eltribo-ruby.vercel.app/",
  "https://eltribo-ui.vercel.app/",
  "https://eltribo-ui.vercel.app",
];
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(morgan("combined"));
app.use(passport.initialize());

app.use("/api", indexRoute);

app.use(globalResponseController);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

process.on("SIGTERM", () => shutdown(server));
process.on("SIGINT", () => shutdown(server));

console.log("inside ************************************************");
