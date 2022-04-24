import { Router } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import UserService from "services/user.service";
import VoteService from "services/vote.service";

const router = Router();

router.get("/", async (req, res, next) => {
    res.send("Success!").status(StatusCodes.OK);
});

router.post(
    "/vote",
    body("vote").isString().trim().escape(),
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        try {
            const data = await VoteService.Vote(req.body.wallet_address);
            return res.sendStatus(StatusCodes.OK).send(data);
        } catch (error: any) {
            next(error);
        }
    }
);

router.post(
    "/register",
    body("username").isString().trim().escape(),
    body("password").isString().trim().escape(),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        try {
            await UserService.createUser(req.body.username, req.body.password);
            return res.sendStatus(StatusCodes.OK);
        } catch (error: any) {
            next(error);
        }
    }
);

router.post(
    "/login",
    body("username").isString().trim().escape(),
    body("password").isString().trim().escape(),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        passport.authenticate(
            "local",
            { session: false },
            function (err, user) {
                if (err) {
                    if (err === StatusCodes.NOT_FOUND) {
                        return res
                            .status(StatusCodes.NOT_FOUND)
                            .json({ error: "User not found." });
                    } else {
                        return next(err);
                    }
                }
                if (!user) {
                    return res
                        .status(StatusCodes.UNAUTHORIZED)
                        .json({ error: "Unauthorized." });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        console.log("error here");
                        return next(err);
                    }
                    const token = UserService.createAuthToken(user);
                    return res
                        .status(StatusCodes.OK)
                        .json({ jwt: token, uuid: user.uuid });
                });
            }
        )(req, res, next);
    }
);

router.post(
    "/connect_wallet",
    body("wallet_address").isString().trim().escape(),
    body("uuid").isString().trim().escape(),
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        try {
            await UserService.connectWallet(
                req.body.wallet_address,
                req.body.uuid
            );
            return res.sendStatus(StatusCodes.OK);
        } catch (error: any) {
            next(error);
        }
    }
);

router.get("/users", async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }

    try {
        const users = await UserService.getUsers();
        return res.status(StatusCodes.OK).json(users);
    } catch (error: any) {
        next(error);
    }
});

export default router;
