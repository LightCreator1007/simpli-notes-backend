import express from "express";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/notes.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

console.log(process.env.CLIENT_URL);

app.use(express.static("./uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://simpli-notes-2.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.path, "Origin:", req.headers.origin);
  next();
});

//routes
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);

export default app;
