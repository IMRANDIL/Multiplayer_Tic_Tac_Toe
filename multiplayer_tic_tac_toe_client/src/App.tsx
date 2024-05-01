

import { useState } from 'react'
import './App.css'
// import Box from './components/Box'
import GameInput from './components/GameInput'
import useSocket from './customhooks/useSocket'
import GameContext, {IGameContextProps} from './context/gameContext'

function App() {
const socket = useSocket("http://localhost:9000")
const [isInRoom, setInRoom] = useState(false)



const contextValue: IGameContextProps = {
  isInRoom,
  setInRoom
};

  return (
    <GameContext.Provider value={contextValue}>
       <div className='container'>
     <h1 style={{
      color: 'darkgray'
     }}>Welcom to Tic_Tac_Toe</h1>
     <GameInput onJoinRoom={()=>{}}/>
     {/* <Box/> */}
    </div>
    </GameContext.Provider>
   
  )
}

export default App
