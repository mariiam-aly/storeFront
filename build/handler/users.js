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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autherization_1 = __importDefault(require("../middleware/autherization"));
const store = new users_1.userStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(404);
        res.json({ error: `Couldn't find any records, ERROR: ${err}` });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(404);
        res.json({ error: `enter a correct phone and password, ERROR: ${err}` });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            phone: req.body.phone,
        };
        const createUsr = yield store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: createUsr }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `enter correct user data, ERROR: ${err}` });
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield store.authenticate(req.body.phone, req.body.password));
        const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error: 'enter a correct phone and password' });
    }
});
const users_routes = (app) => {
    app.get('/users', autherization_1.default, index);
    app.get('/users/:id', autherization_1.default, show);
    app.post('/users', create);
    app.post('/authenticate', autherization_1.default, authenticate);
};
exports.default = users_routes;
