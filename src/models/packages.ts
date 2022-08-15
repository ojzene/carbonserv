import { Schema, model } from "mongoose";

interface IPackage {
    packageCode: string;
    name: string;
    description: string;
    owner: string;
    pickupAddress: any;
    destinationAddress: any;
    createdDate: string,
}

const packageSchema = new Schema<IPackage>({
    packageCode: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    owner: { type: String, required: true },
    pickupAddress: { type: Array, required: true },
    destinationAddress: { type: Array, required: true },
    createdDate: { type: String, required: true }
});

const Package = model<IPackage>('Package', packageSchema);
export { Package }
