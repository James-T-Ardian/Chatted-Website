import express, {Request, Response, Express, RequestHandler} from 'express'
import {createServer, Server} from 'http'
import socketio from 'socket.io'
import { apiErrorHandler } from './error/apiErrorHandler'

const app: Express = express()
const server: Server = createServer(app)
const io: socketio.Server<any> = new socketio.Server(server, {
    cors:{
        origin: '*'
    }
})



app.use(apiErrorHandler)

server.listen(3000, () => {
    console.log("Listening on port 3000...")
})

