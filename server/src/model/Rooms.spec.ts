import { MySQLQueryResult } from '../types/types'
import {Rooms} from './Rooms'

describe('Rooms class', ()=>{
    const roomsModel = new Rooms()
    let testRoom:string

    test("createNewRoom function", async ()=>{
        // There is a dedicated user for testing Rooms named "RoomsTest" with user_id 14
        roomsModel.createNewRoom("14")
        .then((result:MySQLQueryResult)=>{
            testRoom = result.insertId?.toString() as string
            expect(result.affectedRows).toBe(1)
        })
    })

    test("getCreatorIdFromRoomId", async()=>{
        roomsModel.getCreatorIdFromRoomId(testRoom)
        .then((result:MySQLQueryResult)=>{
            expect(result).toEqual([{creator_id: "14"}])
        })
    })

    test("deleteRoomFromRoomId", async()=>{
        roomsModel.deleteRoomFromRoomId(testRoom)
        .then((result:MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })
})