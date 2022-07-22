import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "pre-start/passport/passport.init";
import BaseRouter from "routes/index";
import logger from "shared/Logger";
import Web3 from "web3";

const app = express();

passport(app);

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

console.log(web3.version);
const PORT = process.env.MONGODB_PORT || 3000;
const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb://host.docker.internal:27017/decentralized_voting_system";

mongoose.Promise = Promise;
mongoose.connect(
    MONGODB_URI,
    {
        auth: {
            username: process.env.MONGO_INITDB_ROOT_USERNAME || "ananas",
            password: process.env.MONGO_INITDB_ROOT_PASSWORD || "12345",
        },
        authSource: "admin",
    },
    (err) => {
        if (err) {
            console.error("failed to connect to mongoDB");
            console.error(err);
        } else {
            console.log("mongodb is running and secured");
            app.listen(PORT);
        }
    }
);

const { BAD_REQUEST } = StatusCodes;

/** **********************************************************************************
 *                              Set basic express settings
 * ********************************************************************************* */

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

app.use("/", BaseRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

export default app;
