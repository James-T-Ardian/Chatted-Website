import { MySQLQueryResult } from '../types/types'
import {Rooms} from './Rooms'

describe('Rooms class', ()=>{
    // There is a dedicated user for testing Rooms named "RoomsTest" with user_id 14
    const userTestId: string = "14"

    const roomsModel = new Rooms()
    let testRoomId: string

    test("createNewRoom function", async ()=>{
        let result: MySQLQueryResult = await roomsModel.createNewRoom(userTestId)
        let insertId = result.insertId as number
        testRoomId = insertId.toString()
        expect(result.affectedRows).toBe(1)
    })

    test("getCreatorIdFromRoomId", async ()=>{
        let result: MySQLQueryResult = await roomsModel.getCreatorIdFromRoomId(testRoomId)
        expect(result).toEqual([{creator_id: 14}])
    })

    test("addMemberToRoom", async () =>{
        let result: MySQLQueryResult = await roomsModel.addMemberToRoom(userTestId, testRoomId)
        expect(result.affectedRows).toBe(1)
    })

    test("getAllRoomIdsFromMemberId", async ()=>{
        let result: MySQLQueryResult = await roomsModel.getAllRoomIdsFromMemberId(userTestId)
        expect(result).toEqual([{room_id: Number(testRoomId)}])
    })

    test("deleteAllMembersFromRoomId", async ()=>{
        let result: MySQLQueryResult = await roomsModel.deleteAllMembersFromRoomId(testRoomId)
        expect(result.affectedRows).toBe(1)
    })

    test("deleteRoomFromRoomId", async()=>{
        let result: MySQLQueryResult = await roomsModel.deleteRoomFromRoomId(testRoomId)
        expect(result.affectedRows).toBe(1)
    })
})