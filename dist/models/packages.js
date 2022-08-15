"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    packageCode: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    owner: { type: String, required: true },
    pickupAddress: { type: Array, required: true },
    destinationAddress: { type: Array, required: true },
    createdDate: { type: String, required: true }
});
const Package = (0, mongoose_1.model)('Package', packageSchema);
exports.Package = Package;
