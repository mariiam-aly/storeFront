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
const users_1 = require("../users");
const orders_1 = require("../orders");
const products_1 = require("../products");
const randomstring_1 = __importDefault(require("randomstring"));
const store3 = new products_1.ProductStore();
const store2 = new orders_1.OrderStore();
const store = new users_1.userStore();
let createdProduct;
const order1 = {
    status: 'active',
    usrID: '15',
};
const product = {
    name: 'Meat',
    price: 55,
};
const user_test = {
    first_name: 'Mariam',
    last_name: 'Aly',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
describe('user table', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store.create(user_test);
        expect(res.first_name).toEqual(user_test.first_name);
        expect(res.last_name).toEqual(user_test.last_name);
    }));
    it('authenticate user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield store.authenticate(user_test.phone, user_test.password));
        expect(res.phone).toEqual(user_test.phone);
        expect(res.first_name).toEqual(user_test.first_name);
        expect(res.last_name).toEqual(user_test.last_name);
    }));
});
describe('order table', () => {
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('create new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store2.create(order1);
        expect(res.usrID).toBeDefined;
        expect(res.status).toEqual(order1.status);
    }));
    it('user orders by user_id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store2.show('15');
        expect(res.status).toEqual('active');
    }));
});
describe('Product Model', () => {
    it('create product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store3.create(product);
        expect(res.name).toEqual(product.name);
        expect(res.price).toEqual(product.price);
        createdProduct = res;
    }));
    it('show product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store3.show(createdProduct.id);
        expect(res.name).toEqual(createdProduct.name);
        expect(res.price).toEqual(createdProduct.price);
    }));
    it('display all products test', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield store3.index();
        expect(res[0].name).toEqual(createdProduct.name);
        expect(res[0].price).toEqual(createdProduct.price);
    }));
});
