import { OnConnect, SocketController } from "socket-controllers";



@SocketController()
class GameController {
    @OnConnect()
    public onConnection() {

    }
}