"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages_1 = require("./Messages");
describe("Messages class", () => {
    // There is a dedicated user for testing Messages named "Test1" with user_id = 1
    const userTestId = "1";
    // There is a dedicated room for testing Messages with room_id = 2
    const roomTestId = "2";
    let testMessageId;
    const messagesModel = new Messages_1.Messages();
    test("createNewMessage function", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield messagesModel.createNewMessage(userTestId, roomTestId, "Hello World", "2020-01-23 20:13:12");
        let insertId = result.insertId;
        testMessageId = insertId.toString();
        expect(result.affectedRows).toBe(1);
    }));
    test("getAllMessagesFromRoomId function", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield messagesModel.getAllMessagesFromRoomId(roomTestId);
        expect(result).toEqual([{ message_id: Number(testMessageId), uploader_id: Number(userTestId), room_id: Number(roomTestId), message_text: "Hello World", upload_time: "2020-01-23 20:13:12" }]);
    }));
    test("deleteAllMessagesFromRoomId function", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield messagesModel.deleteAllMessagesFromRoomId(roomTestId);
        expect(result.affectedRows).toBe(1);
    }));
});
