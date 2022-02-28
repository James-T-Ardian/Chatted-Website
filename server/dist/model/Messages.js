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
exports.Messages = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
class Messages {
    // Create new entry in the "messages" database table
    // 
    // Param: uploader_id -> user_id from "users" database table that wants to create new message
    // Param: room_id -> room_id from "room_creators" database table that will show the message
    // Param: message_text -> content of message
    // Param: upload_time -> time the message is uploaded in UTC with the format yyyy-mm-dd HH:MM:SS
    //
    // Returns promise of mysql query result
    createNewMessage(uploader_id, room_id, message_text, upload_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO messages(uploader_id, room_id, message_text, upload_time) VALUES (?, ?, ?, ?)";
            const [result, _] = yield mysql.execute(sql, [uploader_id, room_id, message_text, upload_time]);
            return result;
        });
    }
    // Gets all messages given room_id
    //
    // Param: room_id -> room_id from "room_creators" database table that holds the messages
    //
    // Returns promise of mysql query result
    getAllMessagesFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM messages WHERE room_id = ?";
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
    // Deletes all messages in a given room with id = room_id
    // 
    // Param: room_id -> room_id from "room_creators" database table that holds the messages
    // 
    // Returns promise of mysql query result
    deleteAllMessagesFromRoomId(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM messages WHERE room_id = ?";
            const [result, _] = yield mysql.execute(sql, [room_id]);
            return result;
        });
    }
}
exports.Messages = Messages;
