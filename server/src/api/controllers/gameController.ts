import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";



@SocketController()
@Service()
export class GameController {

    private getSocketGameRoom(socket: Socket): string {
        const soccketRooms = Array.from(socket.rooms.values()).filter((r)=> r !== socket.id)
        const gameRoom = soccketRooms && soccketRooms[0];

        return gameRoom;
    }

    @OnMessage("update_game")
    public async updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() msg: any){
        const gameRoom = this.getSocketGameRoom(socket)
        socket.to(gameRoom).emit("on_game_update", msg)

    }

    @OnMessage("win_game")
    public async notifyWin(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() msg: any){
        const gameRoom = this.getSocketGameRoom(socket)
        socket.to(gameRoom).emit("on_win", msg)

    }


}