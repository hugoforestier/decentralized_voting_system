import { Router } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import WalletService from "services/wallet.service";

const router = Router();

router.get("/", async (req, res, next) => {
    res.send("Success!").status(200);
});

router.post(
    "/connect",
    body("wallet_address").isString().trim().escape(),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        try {
            const data = await WalletService.Connect(req.body.wallet_address);
            return res.status(200).send(data);
        } catch (error: any) {
            next(error);
        }
    }
);

router.get(
    "/wallet",
    body("wallet_address").isString().trim().escape(),
    async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        try {
            const data = await WalletService.getWallet(req.body.wallet_address);
            return res.status(200).send(data);
        } catch (error: any) {
            next(error);
        }
    }
);

export default router;
