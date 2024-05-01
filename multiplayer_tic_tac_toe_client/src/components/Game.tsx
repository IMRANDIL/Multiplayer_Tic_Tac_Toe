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

 const {playerSymbol, setPlayerSymbol, isPlayerTurn, setPlayerTurn, isGameStarted, setIsGameStarted, setInRoom} = useContext(GameContext)
 const [gameStatus, setGameStatus] = useState<"running" | "win" | "draw">("running");

 const checkGameState = (matrix: IPlayMatrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j]);
    }

    if (row.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (row.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let column = [];
    for (let j = 0; j < matrix[i].length; j++) {
      column.push(matrix[j][i]);
    }

    if (column.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (column.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  if (matrix[1][1]) {
    if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }

    if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }
  }

  //Check for a tie
  if (matrix.every((m) => m.every((v) => v !== null))) {
    return [true, true];
  }

  return [false, false];
};

  
const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
  // Logic for updating game matrix
  const newMatrix = [...matrix];
  if (newMatrix[row][column] === null) {
    newMatrix[row][column] = symbol;
    setMatrix(newMatrix);

    if (socket) {
      gameService.updateGame(socket, newMatrix).then(() => {
        const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
        if (currentPlayerWon && otherPlayerWon) {
          const msg = 'The game is a TIE!';
          gameService.onWin(socket, msg);
          alert(msg);
          setInRoom(false)
          window.location.reload(); // Refresh the browser
        } else if (currentPlayerWon && !otherPlayerWon) {
          const msg = 'You Won!';
          gameService.onWin(socket, msg);
          alert(msg);
          setInRoom(false)
          window.location.reload(); // Refresh the browser
        } else if (!currentPlayerWon && otherPlayerWon) {
          const msg = 'You lost!';
          gameService.onWin(socket, msg);
          alert(msg);
          setInRoom(false)
          window.location.reload(); // Refresh the browser
        }

        // After making a move, set the player turn to false
        setPlayerTurn(false);
      });
    }
  }
};

  const handleGameUpdate = () => {
    // Logic for handling game update
   if(socket) {
    console.log('socket>>>>>>>>>>', socket)
    gameService.onGameUpdate(socket, ({matrix})=>{
      setMatrix(matrix)
      checkGameState(matrix)
      // After receiving an update from the server, set the player turn to true
      setPlayerTurn(true);
    })
   }
  };

  const handleGameStart = () => {
    // Logic for handling game start
    if(socket) {
      gameService.onStartGame(socket, (options)=>{
        setIsGameStarted(true)
        setPlayerSymbol(options.symbol)
        if(options.start) {
          setPlayerTurn(true)
        }
      })
    }
  };
  const handleGameWin = () => {
    if (socket) {
      gameService.onGameWinNotif(socket, (message) => {
        console.log("Here", message);
        setPlayerTurn(false);
        alert(message);
      });
    }
      
  };
  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin()

  }, []);

  

  return (
    <div className="game-container">
      {!isGameStarted && (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      )}
      {(!isGameStarted || !isPlayerTurn) && <div className="play-stopper" />}
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
