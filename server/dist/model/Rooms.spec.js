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
const Rooms_1 = require("./Rooms");
describe('Rooms class', () => {
    const roomsModel = new Rooms_1.Rooms();
    let testRoomId;
    test("createNewRoom function", () => __awaiter(void 0, void 0, void 0, function* () {
        // There is a dedicated user for testing Rooms named "RoomsTest" with user_id 14
        return roomsModel.createNewRoom("14")
            .then((result) => {
            let insertId = result.insertId;
            testRoomId = insertId.toString();
            expect(result.affectedRows).toBe(1);
        });
    }));
    test("getCreatorIdFromRoomId", () => __awaiter(void 0, void 0, void 0, function* () {
        return roomsModel.getCreatorIdFromRoomId(testRoomId)
            .then((result) => {
            expect(result).toEqual([{ creator_id: 14 }]);
        });
    }));
    test("addMemberToRoom", () => __awaiter(void 0, void 0, void 0, function* () {
        return roomsModel.addMemberToRoom("14", testRoomId)
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
    test("getAllRoomIdsFromMemberId", () => __awaiter(void 0, void 0, void 0, function* () {
        return roomsModel.getAllRoomIdsFromMemberId("14")
            .then((result) => {
            expect(result).toEqual([{ room_id: Number(testRoomId) }]);
        });
    }));
    test("deleteAllMembersFromRoomId", () => __awaiter(void 0, void 0, void 0, function* () {
        return roomsModel.deleteAllMembersFromRoomId(testRoomId)
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
    test("deleteRoomFromRoomId", () => __awaiter(void 0, void 0, void 0, function* () {
        return roomsModel.deleteRoomFromRoomId(testRoomId)
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
});
