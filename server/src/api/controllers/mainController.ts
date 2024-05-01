import { ConnectedSocket, OnConnect, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";



@SocketController()
@Service() // Only if you are using typedi
export class MainController {
    @OnConnect()
    public onConnection(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
        console.log(`New socket connected: ${socket.id}`)
        socket.on('custom_event', (data)=>{
            console.log('data came from client', data)
        })
    }
}