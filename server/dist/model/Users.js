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
exports.Users = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
// Class with functions to interact with "user" database table
class Users {
    // Creates new user in "users" database table
    // 
    // Param: username -> username of new user
    // Param: password -> password of new user
    //
    // Returns promise of mysql query result
    createNewUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users(username, password) VALUES (?, ?);";
            const [result, _] = yield mysql.execute(sql, [username, password]);
            return result;
        });
    }
    // Gets password of user given their username
    // 
    // Param: username -> username of user
    //
    // Returns promise of mysql query result
    getPasswordFromUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT password FROM users WHERE username = ?";
            const [result, _] = yield mysql.execute(sql, [username]);
            return result;
        });
    }
    // Deletes user given their username
    // 
    // Param: username -> username of user
    //
    // Returns promise of mysql query result
    deleteUserFromUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM users WHERE username = ?;";
            const [result, _] = yield mysql.execute(sql, [username]);
            return result;
        });
    }
}
exports.Users = Users;
