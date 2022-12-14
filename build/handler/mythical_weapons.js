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
const mythical_weapns_1 = require("../models/mythical_weapns");
const store = new mythical_weapns_1.MythicalWeaponStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weapons = yield store.index();
    res.json(weapons);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weapon = yield store.show(req.body.id);
    res.json(weapon);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weapon = {
            name: req.body.name,
            type: req.body.type,
            weight: req.body.weight
        };
        const newWeapon = yield store.create(weapon);
        res.json(newWeapon);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.body.id);
    res.json(deleted);
});
const weaponRoutes = (app) => {
    app.get('/weapons', index);
    app.get('/weapons/:id', show);
    app.post('/weapons', create);
    app.delete('/weapons', destroy);
};
exports.default = weaponRoutes;
