
import { useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client'

function App() {
  const connect = ()=>{
    const socket = io("http://localhost:9000");
    socket.on('connect', ()=>{
      socket.emit('custom_event', {name: 'Ali', isPassionate: true})
    })
  }

  useEffect(()=>{
    connect()
  },[])

  return (
    <div>
     <h1>Welcom to Tic_Tac_Toe</h1>
    </div>
  )
}

export default App
