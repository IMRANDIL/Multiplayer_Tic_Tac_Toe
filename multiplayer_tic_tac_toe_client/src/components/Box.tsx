import { Game } from "./Game";
import { Socket } from "socket.io-client";


const Box = ({socket}:{socket: Socket}) => {
  return (
    <div className='boxContainer'>
      <Game socket={socket}/>
    </div>
  )
}

export default Box