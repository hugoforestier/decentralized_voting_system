import { StatusCodes } from "http-status-codes";
import { RequestError } from "../models/error.model";

export default class VoteService {
    static async Vote(vote: string): Promise<null> {
        try {
            return null;
        } catch (e: any) {
            throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e);
        }
    }
}
