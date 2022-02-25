import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult } from '../types/types'

interface UsersModel{
    createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    getPasswordFromUsername(username: string): Promise<MySQLQueryResult>
    _deleteUserFromUsername(user_id: string): Promise<MySQLQueryResult>
}


const mysql = pool.promise()

// Class with functions to interact with "user" database table
class Users implements UsersModel{

    // Creates new entry in "users" database table
    // 
    // Param: username -> username of new user
    // Param: password -> password of new user
    //
    // Returns promise of mysql query result
    async createNewUser(username: string, password:string): Promise<MySQLQueryResult>{
        
        const sql: string = "INSERT INTO users(username, password) VALUES (?, ?);"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username, password])
        return result
    }

    // Gets password of user given their username
    // 
    // Param: username -> username from "users" database table of user
    //
    // Returns promise of mysql query result
    async getPasswordFromUsername(username: string): Promise<MySQLQueryResult>{
        const sql: string = "SELECT password FROM users WHERE username = ?"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }

    // Deletes entry in "users" databse table given their username. This function is for testing purposes only so that 
    // users that are created for testing can be deleted. However we do not actually give 
    // the functionality to delete users in the final product
    // 
    // Param: username -> username from "users" database table of user
    //
    // Returns promise of mysql query result
    async _deleteUserFromUsername(username: string): Promise<MySQLQueryResult>{
        const sql: string = "DELETE FROM users WHERE username = ?;"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }
}

export {Users}