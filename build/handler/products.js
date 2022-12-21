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
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autherization_1 = __importDefault(require("../middleware/autherization"));
const store = new products_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.status(404);
        res.json({ error: `Couldn't find any records, ERROR: ${err}` });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(404);
        res.json({ error: `enter a correct product id, ERROR: ${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const createProduct = yield store.create(product);
        const token = jsonwebtoken_1.default.sign({ user: createProduct }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `enter correct product data, ERROR: ${err}` });
    }
});
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', autherization_1.default, create);
};
exports.default = products_routes;
