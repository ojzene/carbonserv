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
exports.createPackage = void 0;
const packages_1 = require("../models/packages");
const constants_1 = require("../utils/constants");
const createPackage = (req, res, next) => {
    try {
        const packageCode = (0, constants_1.GENERATE_STRING)(8);
        const name = req.body.name; // making it  string type
        const description = req.body.description;
        const owner = req.body.owner;
        const pickupAddress = req.body.pickupAddress;
        const destinationAddress = req.body.destinationAddress;
        const createdDate = (0, constants_1.TODAYS_DATE)();
        packages_1.Package.findOne({ packageCode: packageCode }, (err, packageData) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(400).json({ message: "Error finding Package Info", err });
            }
            else if (err === null && packageData) {
                res.status(400).json({ message: "Package already existed" });
            }
            else {
                const newPackage = new packages_1.Package({
                    packageCode,
                    name,
                    description,
                    owner,
                    createdDate,
                    pickupAddress,
                    destinationAddress
                });
                const savedPackage = yield newPackage.save();
                if (savedPackage) {
                    res.status(201).json({ message: 'Package successfully created', packageInfo: newPackage });
                }
                else {
                    res.status(400).json({ message: "Error creating Package", savedPackage });
                }
            }
        }));
    }
    catch (error) {
        res.status(400).json({ message: "Error in Package", error });
    }
};
exports.createPackage = createPackage;
