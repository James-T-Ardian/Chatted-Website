import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult } from '../types/types'

interface UsersModel{
    createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    getPasswordFromUsername(username: string): Promise<MySQLQueryResult>
    deleteUserFromUsername(user_id: string): Promise<MySQLQueryResult>
}


class Users implements UsersModel{

    // Creates new user in "users" database table
    // 
    // Param: username -> username of new user
    // Param: password -> password of new user
    //
    // Returns promise of mysql query result
    async createNewUser(username: string, password:string): Promise<MySQLQueryResult>{
        const mysql = pool.promise()
        const sql: string = "INSERT INTO users(username, password) VALUES (?, ?);"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username, password])
        return result
    }

    // Gets password of user given their username
    // 
    // Param: username -> username of user
    //
    // Returns promise of mysql query result
    async getPasswordFromUsername(username: string): Promise<MySQLQueryResult>{
        const mysql = pool.promise()
        const sql: string = "SELECT password FROM users WHERE username = ?"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }

    // Deletes user given their username
    // 
    // Param: username -> username of user
    //
    // Returns promise of mysql query result
    async deleteUserFromUsername(username: string): Promise<MySQLQueryResult>{
        const mysql = pool.promise()
        const sql: string = "DELETE FROM users WHERE username = ?;"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }
}

export {Users}