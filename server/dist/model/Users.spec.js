"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("./Users");
describe("Users class", () => {
    const usersModel = new Users_1.Users();
    test("createNewUser function", () => {
        return usersModel.createNewUser("test", "pass")
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    });
    test("getPasswordFromUserId function", () => {
        return usersModel.getPasswordFromUsername("test")
            .then((result) => {
            expect(result).toEqual([{ password: "pass" }]);
        });
    });
    test("deleteUser function", () => {
        return usersModel.deleteUserFromUsername("test")
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    });
});
