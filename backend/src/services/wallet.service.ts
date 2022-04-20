import { StatusCodes } from "http-status-codes";
import { RequestError } from "../models/error.model";
import { Wallet, Wallet_info } from "../models/wallet.model";

export default class WalletService {
    static async Connect(wallet_address: string): Promise<Wallet_info> {
        try {
            let returnValue = await Wallet.create({
                wallet_address: wallet_address,
            });
            return new Wallet_info(
                returnValue.wallet_address,
                returnValue.voted,
                returnValue.created
            );
        } catch (e: any) {
            throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e);
        }
    }

    static async getWallet(wallet_address: string): Promise<Wallet_info> {
        try {
            const returnValue = await Wallet.find({
                wallet_address: wallet_address,
            });
            return new Wallet_info(
                returnValue[0].wallet_address,
                returnValue[0].voted,
                returnValue[0].created
            );
        } catch (e: any) {
            throw new RequestError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }
}
