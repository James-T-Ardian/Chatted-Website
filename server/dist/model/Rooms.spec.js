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
    let testRoom;
    test("createNewRoom function", () => __awaiter(void 0, void 0, void 0, function* () {
        // There is a dedicated user for testing Rooms named "RoomsTest" with user_id 14
        roomsModel.createNewRoom("14")
            .then((result) => {
            var _a;
            testRoom = (_a = result.insertId) === null || _a === void 0 ? void 0 : _a.toString();
            expect(result.affectedRows).toBe(1);
        });
    }));
    test("getCreatorIdFromRoomId", () => __awaiter(void 0, void 0, void 0, function* () {
        roomsModel.getCreatorIdFromRoomId(testRoom)
            .then((result) => {
            expect(result).toEqual([{ creator_id: "14" }]);
        });
    }));
    test("deleteRoomFromRoomId", () => __awaiter(void 0, void 0, void 0, function* () {
        roomsModel.deleteRoomFromRoomId(testRoom)
            .then((result) => {
            expect(result.affectedRows).toBe(1);
        });
    }));
});
