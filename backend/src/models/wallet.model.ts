import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true, unique: true },
    voted: { type: Boolean, default: false },
    created: { type: Date, default: () => new Date() },
});

export var Wallet = mongoose.model("Wallet", WalletSchema);

export class Wallet_info {
    wallet_address: string;
    voted: boolean;
    created: Date;

    constructor(wallet_address: string, voted: boolean, created: Date) {
        this.wallet_address = wallet_address;
        this.voted = voted;
        this.created = created;
    }
}
