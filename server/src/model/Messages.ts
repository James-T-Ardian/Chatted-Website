import { FieldPacket } from 'mysql2';
import { resourceLimits } from 'worker_threads';
import {pool} from '../config/db'
import { MySQLQueryResult } from '../types/types';

const mysql = pool.promise()

interface MessagesModel{
    createNewMessage(uploader_id: string, room_id: string, message_text: string, upload_time: string): Promise<MySQLQueryResult>,
    getAllMessagesFromRoomId(room_id: string): Promise<MySQLQueryResult>,
    deleteAllMessagesFromRoomId(room_id: string): Promise<MySQLQueryResult>
}

class Messages implements MessagesModel{

    // Create new entry in the "messages" database table
    // 
    // Param: uploader_id -> user_id from "users" database table that wants to create new message
    // Param: room_id -> room_id from "room_creators" database table that will show the message
    // Param: message_text -> content of message
    // Param: upload_time -> time the message is uploaded in UTC with the format yyyy-mm-dd HH:MM:SS
    //
    // Returns promise of mysql query result
    async createNewMessage(uploader_id: string, room_id: string, message_text: string, upload_time: string): Promise<MySQLQueryResult>{
        const sql: string = "INSERT INTO messages(uploader_id, room_id, message_text, upload_time) VALUES (?, ?, ?, ?)"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [uploader_id, room_id, message_text, upload_time]) 
        return result
    }

    // Gets all messages given room_id
    //
    // Param: room_id -> room_id from "room_creators" database table that holds the messages
    //
    // Returns promise of mysql query result
    async getAllMessagesFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = "SELECT * FROM messages WHERE room_id = ?"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [room_id]) 
        return result
    }

    // Deletes all messages in a given room with id = room_id
    // 
    // Param: room_id -> room_id from "room_creators" database table that holds the messages
    // 
    // Returns promise of mysql query result
    async deleteAllMessagesFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = "DELETE FROM messages WHERE room_id = ?"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [room_id]) 
        return result
    }
}

export {Messages}