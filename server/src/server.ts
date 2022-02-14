import express, {Request, Response, Express} from 'express'
import {createServer, Server} from 'http'
import socketio from 'socket.io'

const app: Express = express()
const server:Server = createServer(app)
const io: socketio.Server<any> = new socketio.Server(server, {
    cors:{
        origin: '*'
    }
})



app.get('/',  (req: Request, res: Response) => {
    res.json({ data: 'hello world' });
})


server.listen(3000, () => {
    console.log("Listening on port 3000...")
})

