const mongoose = require("mongoose");

const coinLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
        },
        coinsUsed: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = new mongoose.model("CoinLog", coinLogSchema);
