import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult } from '../types/types'

interface UsersModel{
    createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    getPasswordFromUsername(user_id: string): Promise<MySQLQueryResult>
}


class Users implements UsersModel{
    async createNewUser(username: string, password:string): Promise<MySQLQueryResult>{
        const mysql = pool.promise()
        const sql: string = "INSERT INTO users(username, password) VALUES (?, ?);"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username, password])
        return result
    }

    async getPasswordFromUsername(user_id: string): Promise<MySQLQueryResult>{
        const mysql = pool.promise()
        const sql: string = "SELECT password FROM users WHERE user_id = ?"
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [user_id])
        return result
    }
}

export {Users}