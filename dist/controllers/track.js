"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTracking = exports.getSingleTracking = exports.getTrackingByPackageId = exports.getTracking = exports.updateTracking = exports.createTracking = void 0;
const packages_1 = require("../models/packages");
const track_1 = require("../models/track");
const constants_1 = require("../utils/constants");
const createTracking = (req, res, next) => {
    try {
        const trackingId = (0, constants_1.GENERATE_STRING)(10);
        const packageId = req.params.packageId;
        const createdDate = (0, constants_1.TODAYS_DATE)();
        const deliveryDate = null;
        packages_1.Package.findOne({ packageCode: packageId }, (err, packageData) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(400).json({ message: "Error finding Package Info", err });
            }
            else if (err === null && packageData !== null) { // shows package exist
                const checkTracking = yield track_1.Track.findOne({ packageId: packageId });
                if (checkTracking && checkTracking !== null) {
                    res.status(400).json({ message: "PICK UP cannot be done more than once", checkTracking });
                }
                else {
                    const trackingInfo = new track_1.Track({
                        packageId,
                        trackingId,
                        pickupAddress: packageData.pickupAddress,
                        destinationAddress: packageData.destinationAddress,
                        createdDate,
                        deliveryDate,
                        progress: ["PICKED_UP"]
                    });
                    const savedTracking = yield trackingInfo.save();
                    console.log("savedTtracking:::", savedTracking);
                    if (savedTracking) {
                        res.status(200).json({ message: 'Package successfully picked up', packageData, trackingInfo });
                    }
                    else {
                        res.status(400).json({ message: "Error initiating Tracking", savedTracking });
                    }
                }
            }
            else {
                res.status(400).json({ message: "Package is invalid or doesn't exist" });
            }
        }));
    }
    catch (error) {
        res.status(400).json({ message: "Error in Tracking", error });
    }
};
exports.createTracking = createTracking;
const updateTracking = (req, res, next) => {
    try {
        const packageId = req.params.packageId;
        const trackingId = req.params.trackingId;
        const trackingStatus = req.body.trackingStatus;
        track_1.Track.findOne({ packageId: packageId, trackingId: trackingId }, (err, trackingInfo) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(400).json({ message: "Error finding Tracking Info", err });
            }
            console.log("trackingInfo::", trackingInfo);
            if (trackingInfo !== null) {
                const currentStatus = trackingInfo.status;
                const overallProgress = trackingInfo.progress;
                if (constants_1.TRACKING_STATUS.includes(trackingStatus)) {
                    if (currentStatus === "PICKED_UP" && (trackingStatus === "PICKED_UP")) {
                        res.status(200).json({ message: 'Package has already been picked up', trackingStatus });
                    }
                    else if ((currentStatus !== "PICKED_UP") &&
                        (overallProgress.includes("PICKED_UP")) &&
                        (trackingStatus === "PICKED_UP")) {
                        res.status(200).json({ message: "Package pick up cannot be done more than once", trackingStatus });
                    }
                    else if (currentStatus === "DELIVERED" && (trackingInfo.deliveryDate !== null)) {
                        res.status(200).json({ message: 'Package has already been delivered', trackingStatus });
                    }
                    else {
                        if ((currentStatus === "PICKED_UP" && trackingStatus === "PICKED_UP") ||
                            (currentStatus === "DELIVERED" && trackingStatus === "DELIVERED")) {
                            res.status(200).json({ message: `${currentStatus} cannot be done more than once` });
                        }
                        else {
                            trackingInfo.status = trackingStatus;
                            trackingInfo.updatedDate = (0, constants_1.TODAYS_DATE)();
                            trackingInfo.progress.push(trackingStatus);
                            if (trackingStatus === "DELIVERED") {
                                trackingInfo.deliveryDate = (0, constants_1.TODAYS_DATE)();
                            }
                            const savedStatus = yield trackingInfo.save();
                            if (savedStatus) {
                                res.status(200).json({ message: 'Status successfully updated', trackingStatus: `${trackingStatus}`, trackingInfo });
                            }
                            else {
                                res.status(200).json({ message: 'Failure to update Status', savedStatus });
                            }
                        }
                    }
                }
                else {
                    res.status(400).json({ message: "Unknown Tracking Status" });
                }
            }
            else {
                res.status(400).json({ message: "Tracking record cannot be found" });
            }
        }));
    }
    catch (error) {
        res.status(400).json({ message: "Error in Tracking", error });
    }
};
exports.updateTracking = updateTracking;
const getTracking = (req, res, next) => {
    track_1.Track.find(function (err, trackingData) {
        if (err)
            res.status(400).json({ message: "Error in fetching All Tracking Details", err });
        res.status(200).json(trackingData);
    });
};
exports.getTracking = getTracking;
const getTrackingByPackageId = (req, res, next) => {
    const packageId = req.params.packageId;
    track_1.Track.find({ packageCode: packageId }, (err, trackingData) => {
        if (err)
            res.status(400).json({ message: "Error in fetching Tracking Details", err });
        res.status(200).json(trackingData);
    });
};
exports.getTrackingByPackageId = getTrackingByPackageId;
const getSingleTracking = (req, res, next) => {
    const packageId = req.params.packageId;
    const trackingId = req.params.trackingId;
    track_1.Track.findOne({ packageCode: packageId, trackingId: trackingId }, (err, trackingData) => {
        if (err)
            res.status(400).json({ message: "Error in fetching Tracking Details", err });
        res.status(200).json(trackingData);
    });
};
exports.getSingleTracking = getSingleTracking;
const deleteTracking = (req, res, next) => {
    const packageId = req.params.packageId;
    const trackingId = req.params.trackingId;
    track_1.Track.findOneAndDelete({ packageCode: packageId, trackingId }, (err, result) => {
        if (err)
            res.status(400).json({ message: "Error in deleting Tracking", err });
        res.status(200).json({ message: "Tracking successfully deleted!", result });
    });
};
exports.deleteTracking = deleteTracking;
