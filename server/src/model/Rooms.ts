import {pool} from '../config/db'
import { MySQLQueryResult } from '../types/types';


const mysql = pool.promise()

interface RoomsModel{
    createNewRoom(creator_id:string):Promise<MySQLQueryResult>,
    getCreatorIdFromRoomId(room_id: string): Promise<MySQLQueryResult>
    deleteRoomFromRoomId(room_id: string): Promise<MySQLQueryResult>
    addMemberToRoom(member_id:string, room_id:string): Promise<MySQLQueryResult>
    getAllMemberIdsFromRoomId(room_id:string): Promise<MySQLQueryResult>
    getAllRoomIdsFromMemberId(member_id: string): Promise<MySQLQueryResult>
    deleteAllMembersFromRoomId(room_id: string): Promise<MySQLQueryResult>
}

// Class with functions to interact with "room_creators" and "room_members" database table
class Rooms implements RoomsModel{

    // Create new entry in the "room_creators" database table
    // 
    // Param: creator_id -> user_id from "users" database table that wants to create new room
    //
    // Returns promise of mysql query result
    async createNewRoom(creator_id:string):Promise<MySQLQueryResult>{
        const sql: string = 'INSERT INTO room_creators(creator_id) VALUES (?)'
        const [result, _] = await mysql.execute(sql, [creator_id])
        return result
    }

    // Get id of creator of room 
    // 
    // Param: room_id -> room_id from "room_creators" database table of the room whose creator's id you want to find out
    //
    // Returns promise of mysql query result
    async getCreatorIdFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'SELECT creator_id FROM room_creators WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }

    // Delete entry in "room_creators" database table with given room id. You are required to delete 
    // all members of that room using deleteAllMembersFromRoomId as well as messages in that room 
    // using deleteAllMessagesFromRoomId before actually deleting the room
    //
    // Param: room_id -> room_id from "room_creators" database table of room that you want to delete
    //
    // Returns promise of mysql query result
    async deleteRoomFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'DELETE FROM room_creators WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }

    // Create a new entry in "room_members" database
    //
    // Param: member_id -> user_id from "users" database table that wants to join a room
    // Param: room_id -> room_id from "room_creators" database table that user wants to join
    // 
    // Returns promise of mysql query result
    async addMemberToRoom(member_id: string, room_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'INSERT INTO room_members(room_id, member_id) VALUES (?, ?)'
        const [result, _] = await mysql.execute(sql, [room_id, member_id])
        return result
    }

    // Get ids of all members in a given room 
    // 
    // Param: room_id -> room_id from "room_creators" database table of the room that we want to know the members of
    //
    // Returns promise of mysql query result
    async getAllMemberIdsFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'SELECT member_id FROM room_members WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }

    // Get ids of all rooms that a member is... a member of
    //
    // Param: member_id -> user_id from "users" database table whose membership of rooms you want to know
    // 
    // Returns promise of mysql query result
    async getAllRoomIdsFromMemberId(member_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'SELECT room_id FROM room_members WHERE member_id = ?'
        const [result, _] = await mysql.execute(sql, [member_id])
        return result
    }

    // Delete all entries in "room_members" database table for a given room
    //
    // Param: room_id -> room_id from "room_creators" database table whose membership of rooms you want to know
    // 
    // Returns promise of mysql query result
    async deleteAllMembersFromRoomId(room_id: string): Promise<MySQLQueryResult>{
        const sql: string = 'DELETE FROM room_members WHERE room_id = ?'
        const [result, _] = await mysql.execute(sql, [room_id])
        return result
    }


}

export {Rooms}