// import { connectDatabase } from "./@api_core/adapters/database-adapter.service";
// import auth from "./routes/auth.router";
// import user from "./routes/user.router";
// import http from "http";
// import express, { Express } from "express";
// import morgan from "morgan";
// import { UserRepository } from "./@api_core/repositories/user-repository.service";
// import { EUser } from "./@api_core/entities/euser";


// const router: Express = express();


// connectDatabase().then(async () => {
//    /* let _user: EUser = new EUser();
//     _user.dateNaissance = new Date();
//     _user.email = "naojulius@gmail.com";
//     _user.firstname = "_NAO";
//     _user.lastname = "_JULIUS";
//     _user.sexe = "Homme";
//     _user.password = "nao"; */
//     //console.log( "all users", await UserRepository.findAllAsync());
//     //await UserRepository.saveAsync(_user);
//     //console.log("all users", await UserRepository.findByIdAsync('61a4da9a6c590e655b4851bf'));
//     // await UserRepository.UpdateAsync("61a50d192224cf31934a3915", {});
//     // let  _user = await UserRepository.findByIdAsync('61a50d192224cf31934a3915') as EUser;
//     //  console.log("====>USERS", _user);
     
//     router.use(morgan("dev"));
//     router.use(express.urlencoded({ extended: false }));
//     router.use(express.json());
//     router.use((req, res, next) => {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header(
//             "Access-Control-Allow-Headers",
//             "origin, X-Requested-With,Content-Type,Accept, Authorization"
//         );
//         if (req.method === "OPTIONS") {
//             res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
//             return res.status(200).json({});
//         }
//         next();
//     });
    
//     /** Routes */
//     router.get("/", (req, res, next) => {
//         return res.status(200).json({
//             message: "API page",
//         });
//     });
    
//     router.use("/user", user)
//     router.use("/auth", auth);
    
//     /** Error handling */
//     router.use((req, res, next) => {
//         const error = new Error("not found");
//         return res.status(404).json({
//             message: error.message,
//         });
//     });
    
//     /** Server */
//     const httpServer = http.createServer(router);
//     const PORT: any = process.env.PORT ?? 6060;
//     httpServer.listen(PORT, () =>
//         console.log(`The server is running on port ${PORT}`)
//     );
    
// }).catch(err => console.log(err));



