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
exports.MythicalWeaponStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class MythicalWeaponStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conect = yield database_1.default.connect();
                const sql = 'SELECT * FROM mythical_weapons';
                const result = yield conect.query(sql);
                conect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('test err');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM mythical_weapons WHERE id=($1);`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find book ${id}. Error: ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO mythical_weapons (name, type, weight) VALUES ($1, $2, $3) RETURNING *;`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [b.name, b.type, b.weight]);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could  not add new book. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM mythical_weapons WHERE id=($1);`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not delete book ${id}. Error: ${err}`);
            }
        });
    }
}
exports.MythicalWeaponStore = MythicalWeaponStore;
