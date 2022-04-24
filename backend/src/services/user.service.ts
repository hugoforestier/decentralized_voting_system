import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import KEYS from "../config/keys";
import { RequestError } from "../models/error.model";
import { User, User_info } from "../models/user.model";
import HashUtils from "../utils/hashutils";

export default class UserService {
    static async createUser(
        username: string,
        password: string
    ): Promise<User_info> {
        let hash = null;
        let salt = null;
        if (password) {
            salt = HashUtils.generateSalt(12);
            hash = HashUtils.hashPassword(password, salt);
        }
        const uuid = uuidv4();
        const randomUUID = "-" + uuidv4();

        try {
            let returnValue = await User.create({
                uuid: uuid,
                username: username,
                password: hash,
                wallet_address: randomUUID,
                salt: salt,
            });
            return new User_info(
                returnValue.uuid,
                returnValue.wallet_address,
                returnValue.voted,
                returnValue.created,
                "",
                returnValue.username,
                ""
            );
        } catch (e: any) {
            throw new RequestError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                e.message
            );
        }
    }

    static async deleteUser(uuid: string): Promise<null> {
        try {
            await User.findOneAndDelete({ uuid: uuid });
            return null;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    static async findUserByUsername(
        username: string
    ): Promise<User_info | null> {
        try {
            let returnValue = await User.find({
                username: username,
            });

            return new User_info(
                returnValue[0].uuid,
                returnValue[0].wallet_address,
                returnValue[0].voted,
                returnValue[0].created,
                returnValue[0].password,
                returnValue[0].username,
                returnValue[0].salt
            );
        } catch (e: any) {
            return null;
        }
    }

    static async connectWallet(
        wallet_address: string,
        uuid: string
    ): Promise<User_info | null> {
        try {
            let returnValue = await User.findOneAndUpdate(
                { uuid: uuid },
                { wallet_address: wallet_address }
            );

            return new User_info(
                returnValue[0].uuid,
                returnValue[0].wallet_address,
                returnValue[0].voted,
                returnValue[0].created,
                returnValue[0].password,
                returnValue[0].username,
                returnValue[0].salt
            );
        } catch (e: any) {
            return null;
        }
    }

    static async findUserByUuid(uuid: string): Promise<User_info | null> {
        try {
            let returnValue = await User.find({
                uuid: uuid,
            });

            return new User_info(
                returnValue[0].uuid,
                returnValue[0].wallet_address,
                returnValue[0].voted,
                returnValue[0].created,
                returnValue[0].password,
                returnValue[0].username,
                returnValue[0].salt
            );
        } catch (e: any) {
            return null;
        }
    }

    static async getUsers(): Promise<any> {
        try {
            let returnValue = await User.find({});

            return returnValue;
        } catch (e: any) {
            return null;
        }
    }

    static hashPassword(password: string): [string, string] {
        const salt = HashUtils.generateSalt(12);
        const hash = HashUtils.hashPassword(password, salt);
        return [salt, hash];
    }

    static validatePassword(
        password: string,
        salt: string,
        tryPassword: string
    ): boolean {
        const hash = HashUtils.hashPassword(tryPassword, salt);
        return hash === password;
    }

    static createAuthToken(user: User_info): string {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return jwt.sign({ uuid: user.uuid }, KEYS.JWT_TOKEN_SECRET!, {
            expiresIn: "3600s",
        });
    }
}
