import {pool} from '../config/db'
import { MySQLQueryResult } from '../types/types';


const mysql = pool.promise()

interface RoomsModel{
    createNewRoom(creator_id:string):Promise<MySQLQueryResult>,
    getCreatorIdFromRoomId(room_id: string): Promise<MySQLQueryResult>
    deleteRoomFromRoomId(room_id: string): Promise<MySQLQueryResult>
}

// Class with functions to interact with "room_creators" database table
class Rooms implements RoomsModel{

    // Create new room in the "room_creators" database table
    // 
    // Param: creator_id -> user_id from "users" database table that wants to create new room
    //
    // Returns promise of mysql query result
    async createNewRoom(creator_id:string):Promise<MySQLQueryResult>{
        const sql = 'INSERT INTO room_creators(creator_id) VALUES (?)'
        const [result, _] = await mysql.execute(sql, [creator_id])
        return result
    }

    // Get id of creator of room 
    // 
    // Param: room_id -> id of room whose creator's id you want to find out
    //
    // Returns promise of mysql query result
    async getCreatorIdFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql = 'SELECT creator_id FROM room_creators WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }

    // Delete room with given room id
    //
    // Param: room_id -> id of room you want to delete
    //
    // Returns promise of mysql query result
    async deleteRoomFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql = 'DELETE FROM room_creators WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }
}

export {Rooms}