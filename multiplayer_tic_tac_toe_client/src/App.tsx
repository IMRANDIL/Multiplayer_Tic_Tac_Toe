

import { useState } from 'react'
import './App.css'
// import Box from './components/Box'
import GameInput from './components/GameInput'
import useSocket from './customhooks/useSocket'
import GameContext, {IGameContextProps} from './context/gameContext'
import Box from './components/Box'

function App() {
const socket = useSocket("http://localhost:9000")
const [isInRoom, setInRoom] = useState(false)
const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
const [isPlayerTurn, setPlayerTurn] = useState(false);
const [isGameStarted, setIsGameStarted] = useState(false)
const contextValue: IGameContextProps = {
  isInRoom,
  setInRoom,
  playerSymbol,
  setPlayerSymbol,
  isPlayerTurn,
  setPlayerTurn,
  isGameStarted,
  setIsGameStarted
};

  return (
    <GameContext.Provider value={contextValue}>
       <div className='container'>
     <h1 style={{
      color: 'darkgray'
     }}>Welcom to Tic_Tac_Toe</h1>
     {!isInRoom && <GameInput  socket={socket}/>}
     {isInRoom && < Box socket={socket}/>}
    </div>
    </GameContext.Provider>
   
  )
}

export default App
