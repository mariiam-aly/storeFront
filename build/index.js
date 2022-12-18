"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("./handler/orders"));
const users_1 = __importDefault(require("./handler/users"));
const products_1 = __importDefault(require("./handler/products"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', (_req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, orders_1.default)(app);
(0, users_1.default)(app);
(0, products_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});
exports.default = app;
