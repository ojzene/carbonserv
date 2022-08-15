"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const mongoose_1 = require("mongoose");
const trackingSchema = new mongoose_1.Schema({
    trackingId: { type: String, required: true },
    packageId: { type: String, required: true },
    pickupAddress: { type: Array, required: true },
    destinationAddress: { type: Array, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, required: false },
    deliveryDate: { type: String, required: false },
    status: {
        type: String,
        enum: ["PICKED_UP", "IN_TRANSIT", "WAREHOUSE", "DELIVERED"],
        default: "PICKED_UP"
    },
    progress: { type: Array, required: true },
});
const Track = (0, mongoose_1.model)('Track', trackingSchema);
exports.Track = Track;
