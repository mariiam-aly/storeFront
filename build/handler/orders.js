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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autherization_1 = __importDefault(require("../middleware/autherization"));
dotenv_1.default.config();
const store = new orders_1.OrderStore();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield store.show(req.params.id);
        var token = jsonwebtoken_1.default.sign({ user: order }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(404);
        res.json({ error: `enter a correct order id, ERROR: ${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            status: req.body.status,
            usrID: req.body.usrID,
        };
        const createOrdr = yield store.create(order);
        const token = jsonwebtoken_1.default.sign({ user: createOrdr }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `enter correct order data, ERROR: ${err}` });
    }
});
const orders_routes = (app) => {
    app.get('/orders/:id', show);
    app.post('/orders', autherization_1.default, create);
};
exports.default = orders_routes;
