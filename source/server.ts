import { connectDatabase } from "./@api_core/adapters/database-adapter.service";
import auth from "./routes/auth.router";
import user from "./routes/user.router";
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import { UserRepository } from "./@api_core/repositories/user-repository.service";
import { EUser } from "./@api_core/entities/euser";
import path from "path";

const router: Express = express();

connectDatabase()
  .then(async () => {
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
    // router.get("/", (req, res, next) => {
    //   return res.status(200).json({
    //     message: "API page",
    //   });
    // });

    router.set("views", path.join(__dirname, "views"));
    router.set("view engine", "ejs");

    // define a route handler for the default home page
    router.get("/", (req, res) => {
      // render the index template
      res.render("index");
    });

    router.use("/user", user);
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
  .catch((err) => console.log(err));
