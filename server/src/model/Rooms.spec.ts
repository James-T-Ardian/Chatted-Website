import { MySQLQueryResult } from '../types/types'
import {Rooms} from './Rooms'

describe('Rooms class', ()=>{

    const roomsModel = new Rooms()
    let testRoomId: string

    test("createNewRoom function", async ()=>{
        // There is a dedicated user for testing Rooms named "RoomsTest" with user_id 14
        return roomsModel.createNewRoom("14")
        .then((result: MySQLQueryResult)=>{
            let insertId = result.insertId as number
            testRoomId = insertId.toString()
            expect(result.affectedRows).toBe(1)
        })
    })

    test("getCreatorIdFromRoomId", async ()=>{
        return roomsModel.getCreatorIdFromRoomId(testRoomId)
        .then((result: MySQLQueryResult)=>{
            expect(result).toEqual([{creator_id: 14}])
        })
    })

    test("addMemberToRoom", async () =>{
        return roomsModel.addMemberToRoom("14", testRoomId)
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })

    test("getAllRoomIdsFromMemberId", async ()=>{
        return roomsModel.getAllRoomIdsFromMemberId("14")
        .then((result: MySQLQueryResult)=>{
            expect(result).toEqual([{room_id: Number(testRoomId)}])
        })
    })

    test("deleteAllMembersFromRoomId", async ()=>{
        return roomsModel.deleteAllMembersFromRoomId(testRoomId)
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })

    test("deleteRoomFromRoomId", async()=>{
        return roomsModel.deleteRoomFromRoomId(testRoomId)
        .then((result: MySQLQueryResult)=>{
            expect(result.affectedRows).toBe(1)
        })
    })
})