import React from "react";

export interface IGameContextProps {
  isInRoom: boolean;
  setInRoom: (isInRoom: boolean) => void;
  playerSymbol: "x" | "o";
  setPlayerSymbol: (symbol: "x" | "o")=> void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
}

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {}, // Placeholder implementation,
  playerSymbol: "x",
  setPlayerSymbol: ()=>{},
  isPlayerTurn: false,
  setPlayerTurn: ()=>{}
};

const GameContext = React.createContext(defaultState);

export default GameContext;
