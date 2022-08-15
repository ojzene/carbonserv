import { RequestHandler, response } from 'express';
import { Package } from '../models/packages';
import { Track } from '../models/track';

import { TRACKING_STATUS, TODAYS_DATE, GENERATE_STRING } from '../utils/constants';

export const createTracking: RequestHandler = (req, res, next) => {
    try {
        const trackingId = GENERATE_STRING(10);
        const packageId = (req.params as { packageId: string }).packageId;
        const createdDate = TODAYS_DATE();
        const deliveryDate = null;

        Package.findOne({ packageCode: packageId }, async (err: any, packageData: any) => {
            if (err) {
                res.status(400).json({ message: "Error finding Package Info", err });
            }
            else if (err === null && packageData) { // shows package exist
                const checkTracking = await Track.findOne({ packageId: packageId });
                if (checkTracking && checkTracking !== null) {
                    res.status(400).json({ message: "PICK UP cannot be done more than once", checkTracking });
                } else {
                    const trackingInfo = new Track({
                        packageId,
                        trackingId,
                        pickupAddress: packageData.pickupAddress,
                        destinationAddress: packageData.destinationAddress,
                        createdDate,
                        deliveryDate,
                        progress: ["PICKED_UP"]
                    });

                    const savedTracking = await trackingInfo.save();
                    if (savedTracking) {
                        res.status(201).json({ message: 'Tracking successfully picked up', packageData, trackingInfo });
                    } else {
                        res.status(400).json({ message: "Error initiating Tracking", savedTracking });
                    }
                }
            } else {
                res.status(200).json({ message: "Tracking cannot be initiated. Package is invalid or doesn't exist" });
            }
        })
    }
    catch (error) {
        res.status(400).json({ message: "Error in Tracking", error });
    }
};

export const updateTracking: RequestHandler = (req, res, next) => {
    try {
        const packageId = (req.params as { packageId: string }).packageId;
        const trackingId = (req.params as { trackingId: string }).trackingId;
        const trackingStatus = (req.body as { trackingStatus: string }).trackingStatus;
        
        Track.findOne({ packageCode: packageId, trackingId: trackingId }, async (err: any, trackingInfo: any) => {
            if(err) {
                res.status(400).json({ message: "Error finding Tracking Info", err });
            }
            if(trackingInfo) {
                const currentStatus = trackingInfo.status;
                const overallProgress = trackingInfo.progress;

                if (TRACKING_STATUS.includes(trackingStatus)) {
                    if (currentStatus === "PICKED_UP" && (trackingStatus === "PICKED_UP")) {
                        res.status(400).json({ message: 'Package has already been picked up' });
                    }
                    else if ((currentStatus !== "PICKED_UP") && 
                            (overallProgress.includes("PICKED_UP")) && 
                            (trackingStatus === "PICKED_UP")) {
                        res.status(400).json({ message: "Package pick up cannot be done more than once" });
                    }
                    else if (currentStatus === "DELIVERED" && (trackingInfo.deliveryDate !== null)) {
                        res.status(400).json({ message: 'Package has already been delivered' });
                    }
                    else {
                        if ((currentStatus === "PICKED_UP" && trackingStatus === "PICKED_UP") ||
                            (currentStatus === "DELIVERED" && trackingStatus === "DELIVERED")) {
                            res.status(400).json({ message: `${currentStatus} cannot be done more than once` });
                        } else {
                            trackingInfo.status = trackingStatus;
                            trackingInfo.updatedDate = TODAYS_DATE();
                            trackingInfo.progress.push(trackingStatus);
                            if (trackingStatus === "DELIVERED") {
                                trackingInfo.deliveryDate = TODAYS_DATE();
                            }
                            const savedStatus = await trackingInfo.save();
                            if (savedStatus) {
                                res.status(200).json({ message: 'Status successfully updated', trackingStatus: `${trackingStatus}`, trackingInfo });
                            } else {
                                res.status(200).json({ message: 'Failure to update Status', savedStatus });
                            }
                        }
                    }
                } else {
                    res.status(400).json({ message: "Unknown Tracking Status" });
                }
            } else {
                res.status(400).json({ message: "Tracking record cannot be found" });
            }
        })
    } catch (error) {
        res.status(400).json({ message: "Error in Tracking", error });
    }
}

export const getTracking: RequestHandler = (req, res, next) => {}

export const getSingleTracking: RequestHandler = (req, res, next) => {}

export const deleteTracking: RequestHandler = (req, res, next) => {} 
