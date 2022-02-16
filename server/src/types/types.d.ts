import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2"

// Workaround to allow certain variables to exists in all types specified under MySQLQueryCombinedTypes
type MySQLQueryCombinedTypes = OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]

export interface MySQLQueryResult extends MySQLQueryCombinedTypes {
    length?: number
    insertId?: number
    affectedRows?: number
}