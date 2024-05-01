import { Socket } from "socket.io-client";
import { IPlayMatrix, IStartGame } from "../../components/Game";


class GameSocketService {

    public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
        return new Promise((res,rej)=>{
            socket.emit("join_game", {roomId});
            socket.on('room_joined', ()=> res(true));
            socket.on('room_join_error', ({error})=> rej(error))
        })
    }

    public async updateGame(socket: Socket, gameMatrix: IPlayMatrix) {
       socket.emit('update_game', {
        matrix: gameMatrix
       })
    }

    public async onGameUpdate(socket: Socket, listener: (matrix: IPlayMatrix)=> void) {
        socket.on('on_game_update', (matrix)=>listener(matrix))
    }

    public async onStartGame(socket: Socket, listener: (option: IStartGame)=> void){
        socket.on('start_game', listener)
    }

    public async onWin(socket: Socket, msg: string) {
        socket.emit('game_win', {msg});

    }

    public async onGameWinNotif(socket: Socket, listener: (msg: string)=> void) {
        socket.on('on_win', ({msg})=> listener(msg))
    }
}

export default new GameSocketService(); //singleton pattern