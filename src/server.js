import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStroe from  "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouther from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine","pug");
app.set("views",process.cwd()+"/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));

app.use(
    session({
        secret:process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store:MongoStroe.create({mongoUrl : process.env.DB_URL}),
    })
);

app.use(localsMiddleware);
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("assets"));
app.use("/",rootRouter);
app.use("/videos",videoRouther);
app.use("/users",userRouter);
app.use("/api",apiRouter)


export default app;



