import { Schema, model } from "mongoose";

interface ITrack {
    trackingId: string;
    packageId: string;
    pickupAddress: any;
    destinationAddress: any;
    createdDate: string;
    updatedDate: string;
    deliveryDate: string;
    status: any;
    progress: any;
}

const trackingSchema = new Schema<ITrack>({
    trackingId: { type: String, required: true },
    packageId: { type: String, required: true },
    pickupAddress:{ type: Array, required: true },
    destinationAddress: { type: Array, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, required: false },
    deliveryDate: { type: String, required: false },
    status: {
        type: String,
        enum: [ "PICKED_UP", "IN_TRANSIT", "WAREHOUSE", "DELIVERED" ],
        default: "PICKED_UP"
    },
    progress: { type: Array, required: true },
})

const Track = model<ITrack>('Track', trackingSchema);
export { Track }
