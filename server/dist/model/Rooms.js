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
// Class with functions to interact with "room_creators" and "room_members" database table
class Rooms {
    // Create new entry in the "room_creators" database table
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
    // Param: room_id -> room_id from "room_creators" database table of the room whose creator's id you want to find out
    //
    // Returns promise of mysql query result
    getCreatorIdFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT creator_id FROM room_creators WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
    // Delete entry in "room_creators" database table with given room id. You are required to delete 
    // all members of that room using deleteAllMembersFromRoomId as well as messages in that room 
    // using deleteAllMessagesFromRoomId before actually deleting the room
    //
    // Param: room_id -> room_id from "room_creators" database table of room that you want to delete
    //
    // Returns promise of mysql query result
    deleteRoomFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM room_creators WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
    // Create a new entry in "room_members" database
    //
    // Param: member_id -> user_id from "users" database table that wants to join a room
    // Param: room_id -> room_id from "room_creators" database table that user wants to join
    // 
    // Returns promise of mysql query result
    addMemberToRoom(member_id, room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO room_members(room_id, member_id) VALUES (?, ?)';
            const [result, _] = yield mysql.execute(sql, [room_id, member_id]);
            return result;
        });
    }
    // Get ids of all members in a given room 
    // 
    // Param: room_id -> room_id from "room_creators" database table of the room that we want to know the members of
    //
    // Returns promise of mysql query result
    getAllMemberIdsFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT member_id FROM room_members WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
    // Get ids of all rooms that a member is... a member of
    //
    // Param: member_id -> user_id from "users" database table whose membership of rooms you want to know
    // 
    // Returns promise of mysql query result
    getAllRoomIdsFromMemberId(member_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT room_id FROM room_members WHERE member_id = ?';
            const [result, _] = yield mysql.execute(sql, [member_id]);
            return result;
        });
    }
    // Delete all entries in "room_members" database table for a given room
    //
    // Param: room_id -> room_id from "room_creators" database table whose membership of rooms you want to know
    // 
    // Returns promise of mysql query result
    deleteAllMembersFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM room_members WHERE room_id = ?';
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
}
exports.Rooms = Rooms;
