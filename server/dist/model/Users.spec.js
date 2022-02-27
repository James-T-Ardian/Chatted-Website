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
const Users_1 = require("./Users");
describe("Users class", () => {
    const usersModel = new Users_1.Users();
    test("createNewUser function", () => __awaiter(void 0, void 0, void 0, function* () {
        return usersModel.createNewUser("test", "pass")
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
    test("getPasswordFromUsername function", () => __awaiter(void 0, void 0, void 0, function* () {
        return usersModel.getPasswordFromUsername("test")
            .then((result) => {
            expect(result).toEqual([{ password: "pass" }]);
        });
    }));
    test("deleteUserFromUsername function", () => __awaiter(void 0, void 0, void 0, function* () {
        return usersModel._deleteUserFromUsername("test")
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
});
