"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*'
    }
});
app.get('/', (req, res) => {
    res.json({ data: 'hello world' });
});
server.listen(3000, () => {
    console.log("Listening on port 3000...");
});
