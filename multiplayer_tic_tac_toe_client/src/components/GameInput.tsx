import React, { useState, useEffect, useRef } from "react";

interface IGameInputProps {
  onJoinRoom: (roomName: string) => void;
}

const GameInput: React.FC<IGameInputProps> = ({ onJoinRoom }) => {
  const [roomName, setRoomName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current?.focus();
  }, []); // Empty dependency array ensures this effect runs only once after mounting

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onJoinRoom(roomName);
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
        <button className="button" type="submit">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default GameInput;
