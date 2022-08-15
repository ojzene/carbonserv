"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const body_parser_1 = require("body-parser");
const packages_1 = __importDefault(require("./routes/packages"));
const track_1 = __importDefault(require("./routes/track"));
(0, mongoose_1.connect)('mongodb+srv://kanmit:Notice2022@cluster0.d0487.mongodb.net/pcktracking');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use('/packages', packages_1.default);
app.use('/tracking', track_1.default);
app.get('/', (req, res) => {
    res.send("Welcome to Package Tracking");
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Carbon App is running on Port ${port}`));
