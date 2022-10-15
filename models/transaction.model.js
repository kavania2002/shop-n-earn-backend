const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
        },
        amount: {
            type: Number,
            default: 0,
        },
        isSettled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);