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
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const randomstring_1 = __importDefault(require("randomstring"));
const index_1 = __importDefault(require("../../index"));
const users_1 = require("../users");
const request = (0, supertest_1.default)(index_1.default);
const user = new users_1.userStore();
let createduser;
const user1 = {
    first_name: 'Ali',
    last_name: 'Omar',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
const user2 = {
    first_name: 'Tarek',
    last_name: 'Hisham',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
describe(' user routes ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        createduser = (yield user.create(user1));
    }));
    it('index', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield request.get('/');
            expect(res.status).toBe(200);
        }
        catch (err) {
            throw err;
        }
    }));
    it('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/users').send(user2);
        exports.token = res.body;
        expect(res.status).toBe(200);
    }));
    it('show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/users/${createduser.id}`)
            .set(Object.assign(Object.assign({}, jsonHeaders), { Authorization: 'Bearer ' + exports.token }));
        expect(res.status).toBe(200);
    }));
    it('authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/authenticate')
            .set(Object.assign(Object.assign({}, jsonHeaders), { Authorization: 'Bearer ' + exports.token }))
            .send({ phone: user1.phone, password: user1.password });
        expect(res.status).toBe(200);
    }));
});
exports.default = exports.token;
