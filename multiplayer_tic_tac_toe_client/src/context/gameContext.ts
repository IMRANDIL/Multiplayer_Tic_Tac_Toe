import React from "react";

export interface IGameContextProps {
  isInRoom: boolean;
  setInRoom: (isInRoom: boolean) => void;
}

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {} // Placeholder implementation
};

const GameContext = React.createContext(defaultState);

export default GameContext;
