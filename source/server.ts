import { connectToDatabase } from "./services/database.service";
import auth from "./routes/auth.router";
import user from "./routes/user.router";
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";

const router: Express = express();

connectToDatabase()
  .then(() => {
    router.use(morgan("dev"));
    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());
    router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
      );
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
      }
      next();
    });

    /** Routes */
    router.get("/", (req, res, next) => {
      return res.status(200).json({
        message: "API page",
      });
    });

    router.use("/user", user)
    router.use("/auth", auth);

    /** Error handling */
    router.use((req, res, next) => {
      const error = new Error("not found");
      return res.status(404).json({
        message: error.message,
      });
    });

    /** Server */
    const httpServer = http.createServer(router);
    const PORT: any = process.env.PORT ?? 6060;
    httpServer.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
