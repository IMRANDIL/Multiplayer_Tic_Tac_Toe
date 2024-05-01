import React, { useContext, useEffect, useState } from "react";
import "./Game.css"; // Import CSS file for styling
import GameContext from "../context/gameContext";
import gameService from "../services/gameService";
import { Socket } from "socket.io-client";

export type IPlayMatrix = Array<Array<string | null>>;
export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}

export function Game({socket}: {socket: Socket}) {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

 const {playerSymbol, setPlayerSymbol, isPlayerTurn, setPlayerTurn} = useContext(GameContext)

  const checkGameState = (matrix: IPlayMatrix) => {
    // Logic for checking game state
    // ...
  };

  const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
    // Logic for updating game matrix
    const newMatrix = [...matrix]
    if(newMatrix[row][column] === null || newMatrix[row][column] === 'null'){
        newMatrix[row][column] = symbol;
        
        setMatrix(newMatrix)
        // After making a move, set the player turn to false
        setPlayerTurn(false);
    }
    if(socket) {
      gameService.updateGame(socket, newMatrix)
    }
    
  };

  const handleGameUpdate = () => {
    // Logic for handling game update
   if(socket) {
    console.log('socket>>>>>>>>>>', socket)
    gameService.onGameUpdate(socket, ({matrix})=>{
      setMatrix(matrix)
      // After receiving an update from the server, set the player turn to true
      setPlayerTurn(true);
    })
   }
  };

  const handleGameStart = () => {
    // Logic for handling game start
    // ...
  };

  const handleGameWin = () => {
    // Logic for handling game win
    // ...
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <div className="game-container">
      {(!isPlayerTurn) && <div className="play-stopper" />}
      { matrix.map((row, rowIdx) => {
        return (
          <div className="row-container" key={`row-${rowIdx}`}>
            {row.map((column, columnIdx) => (
              <div
              key={`cell-${rowIdx}-${columnIdx}`}
                className={`cell ${
                  columnIdx < 2 ? "border-right" : ""} ${
                  columnIdx > 0 ? "border-left" : ""} ${
                  rowIdx < 2 ? "border-bottom" : ""} ${
                  rowIdx > 0 ? "border-top" : ""}`}
                onClick={() =>
                  // Only allow the player to make a move if it's their turn
                  isPlayerTurn && updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                }
              >
                {column && column !== "null" ? (
                  column === "x" ? (
                    <span className="x">X</span>
                  ) : (
                    <span className="o">O</span>
                  )
                ) : null}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
