"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
};
app.get('/weapon', (_req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/weapon/:id', (_req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/weapon', (req, res) => {
    const weapon = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    };
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.put('/weapon/:id', (req, res) => {
    const weapon = {
        id: req.params.id,
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    };
    try {
        res.send('this is the EDIT route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.delete('/weapon/:id', (_req, res) => {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});
exports.default = app;
