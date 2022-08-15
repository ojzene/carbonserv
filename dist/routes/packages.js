"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const package_1 = require("../controllers/package");
const router = (0, express_1.Router)();
router.post('/', package_1.createPackage);
router.get('/', package_1.getAllPackages);
exports.default = router;
