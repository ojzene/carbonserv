"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TODAYS_DATE = exports.GENERATE_STRING = exports.TRACKING_STATUS = void 0;
exports.TRACKING_STATUS = [
    "PICKED_UP",
    "IN_TRANSIT",
    "WAREHOUSE",
    "DELIVERED"
];
const GENERATE_STRING = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
exports.GENERATE_STRING = GENERATE_STRING;
const TODAYS_DATE = () => {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
};
exports.TODAYS_DATE = TODAYS_DATE;
