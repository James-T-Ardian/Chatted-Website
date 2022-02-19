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
exports.Rooms = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
// Class with functions to interact with "room_creators" database table
class Rooms {
    // Create new room in the "room_creators" database table
    // 
    // Param: creator_id -> user_id from "users" database table that wants to create new room
    //
    // Returns promise of mysql query result
    createNewRoom(creator_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO room_creators(creator_id) VALUES (?)';
            const [result, _] = yield mysql.execute(sql, [creator_id]);
            return result;
        });
    }
    // Get id of creator of room 
    // 
    // Param: room_id -> id of room whose creator's id you want to find out
    //
    // Returns promise of mysql query result
    getCreatorIdFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT creator_id FROM room_creators WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
    // Delete room with given room id
    //
    // Param: room_id -> id of room you want to delete
    //
    // Returns promise of mysql query result
    deleteRoomFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM room_creators WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
}
exports.Rooms = Rooms;
