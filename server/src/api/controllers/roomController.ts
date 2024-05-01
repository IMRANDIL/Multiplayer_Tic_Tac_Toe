import { OnMessage, SocketController } from "socket-controllers";
import { Service } from "typedi";



@SocketController()
@Service()
export class RoomController {
    @OnMessage("join_game")
    public joinGame(){

    }
}