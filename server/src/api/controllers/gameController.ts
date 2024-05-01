import { ConnectedSocket, OnConnect, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";



@SocketController()
@Service() // Only if you are using typedi
export class GameController {
    @OnConnect()
    public onConnection(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
        console.log(`New socket connected: ${socket.id}`)
    }
}