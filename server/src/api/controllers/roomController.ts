import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";



@SocketController()
@Service()
export class RoomController {
    @OnMessage("join_game")
    public async joinGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() msg: any){
        console.log("New user joined the room", socket.id, msg);

        const ConnectedSockets = io.sockets.adapter.rooms.get(msg.roomdId) //will tell us the connected socket in that particular room...

        const socketRooms = Array.from(socket.rooms.values()).filter((r)=> r !== socket.id)

        if(socketRooms.length > 0 || ConnectedSockets && ConnectedSockets.size === 2) {
            socket.emit("room_join_error", {
                error: "Room is full, please choose another room"
            })
        } else {
            await  socket.join(msg.roomId) //join the room now
            socket.emit("room_joined")
        }

    }
}