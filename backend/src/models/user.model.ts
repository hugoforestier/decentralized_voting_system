import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallet_address: { type: String, unique: true, required: true },
    voted: { type: Boolean, default: false },
    salt: { type: String, required: true },
    created: { type: Date, default: () => new Date() },
});

export var User = mongoose.model("User", UserSchema);

export class User_info {
    uuid: string;
    wallet_address?: string;
    voted: boolean;
    created: Date;
    password: string;
    username: string;
    salt: string;

    constructor(
        uuid: string,
        wallet_address: string,
        voted: boolean,
        created: Date,
        password: string,
        username: string,
        salt: string
    ) {
        this.uuid = uuid;
        this.wallet_address = wallet_address;
        this.voted = voted;
        this.created = created;
        this.password = password;
        this.username = username;
        this.salt = salt;
    }
}
