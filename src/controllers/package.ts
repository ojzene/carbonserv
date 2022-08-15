import { RequestHandler, response } from 'express';
import { Package } from '../models/packages';

import { TODAYS_DATE, GENERATE_STRING } from '../utils/constants';

export const createPackage: RequestHandler = (req, res, next) => {
    try {
        const packageCode = GENERATE_STRING(8);
        const name = (req.body as { name: string }).name; // making it  string type
        const description = (req.body as { description: string }).description;
        const owner = (req.body as { owner: string }).owner;
        const pickupAddress = (req.body as { pickupAddress: any }).pickupAddress;
        const destinationAddress = (req.body as { destinationAddress: any }).destinationAddress;
        const createdDate = TODAYS_DATE();

        Package.findOne({ packageCode: packageCode }, async (err: any, packageData: any) => {
            if (err) {
                res.status(400).json({ message: "Error finding Package Info", err });
            }
            else if (err === null && packageData) {
                res.status(400).json({ message: "Package already existed" });
            }
            else {
                const newPackage = new Package({
                    packageCode,
                    name,
                    description,
                    owner,
                    createdDate,
                    pickupAddress,
                    destinationAddress
                });

                const savedPackage = await newPackage.save();
                if (savedPackage) {
                    res.status(201).json({ message: 'Package successfully created', packageInfo: newPackage });
                } else {
                    res.status(400).json({ message: "Error creating Package", savedPackage });
                }
            }
        })
    } catch (error) {
        res.status(400).json({ message: "Error in Package", error });
    }
};

export const getAllPackages: RequestHandler = (req, res, next) => {
    Package.find(function (err, packageData) {
        if(err) res.status(400).json({ message: "Error in fetching All Packages", err });
        res.status(200).json(packageData);
    })
}