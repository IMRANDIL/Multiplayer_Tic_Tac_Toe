

import './App.css'
// import Box from './components/Box'
import GameInput from './components/GameInput'
import useSocket from './customhooks/useSocket'


function App() {
const socket = useSocket("http://localhost:9000")

  return (
    <div className='container'>
     <h1 style={{
      color: 'darkgray'
     }}>Welcom to Tic_Tac_Toe</h1>
     <GameInput onJoinRoom={()=>{}}/>
     {/* <Box/> */}
    </div>
  )
}

export default App
