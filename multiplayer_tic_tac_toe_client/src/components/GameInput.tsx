import React, { useState, useEffect, useRef, useContext } from "react";
import GameContext from "../context/gameContext";
import { Socket } from "socket.io-client";
import gameService from "../services/gameService";

interface IGameInputProps {
  socket: Socket | null;
}

const GameInput: React.FC<IGameInputProps> = ({ socket }) => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setIsJoining] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const {isInRoom, setInRoom} = useContext(GameContext)


  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current?.focus();
  }, []); // Empty dependency array ensures this effect runs only once after mounting

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const joinRoom = async ()=>{
    if(!roomName || roomName.trim() === "" || !socket) return;
    setIsJoining(true)
    const joined = await gameService.joinGameRoom(socket, roomName).catch((err)=> {
      setIsJoining(false)
      alert(err)
    });
    if(joined) {
      setInRoom(true)
      setIsJoining(false)
    }else {
      setInRoom(false)
      setIsJoining(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom()
    setRoomName(""); // Clear input after submission
  };

  return (
    <div className="containerGame">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="roomName">
          Enter Game Room Name:
        </label>
        <input
          ref={inputRef} // Ref to focus the input element
          className="input"
          type="text"
          id="roomName"
          value={roomName}
          placeholder="Enter Room Id"
          onChange={handleChange}
          required
        />
        <button className="button" type="submit" disabled={isJoining}>
          {isJoining ? "Joining..." : "Join Room"}
        </button>
      </form>
    </div>
  );
};

export default GameInput;
