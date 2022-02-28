import { MySQLQueryResult } from '../types/types'
import {Messages} from './Messages'

describe("Messages class", ()=>{
    // There is a dedicated user for testing Messages named "Test1" with user_id = 1
    const userTestId: string = "1"

    // There is a dedicated room for testing Messages with room_id = 2
    const roomTestId: string = "2"

    let testMessageId: string

    const messagesModel = new Messages()

    test("createNewMessage function", async ()=>{
        const result: MySQLQueryResult = await messagesModel.createNewMessage(userTestId, roomTestId, "Hello World", "2020-01-23 20:13:12")
        let insertId = result.insertId as number
        testMessageId = insertId.toString()
        expect(result.affectedRows).toBe(1)
    })

    test("getAllMessagesFromRoomId function", async ()=>{
        const result: MySQLQueryResult = await messagesModel.getAllMessagesFromRoomId(roomTestId)
        expect(result).toEqual([{message_id: Number(testMessageId), uploader_id: Number(userTestId), room_id: Number(roomTestId), message_text: "Hello World", upload_time: "2020-01-23 20:13:12"}])
    })

    test("deleteAllMessagesFromRoomId function", async ()=>{
        const result: MySQLQueryResult = await messagesModel.deleteAllMessagesFromRoomId(roomTestId)
        expect(result.affectedRows).toBe(1)
    })
})