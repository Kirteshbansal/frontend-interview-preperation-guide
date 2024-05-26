import React, { useState, useRef } from 'react';

import Button from './common/Button';
import Text from './common/Text';
import { noop } from '../utils/functionUtils';
import { getPlayer, gameStateData , getDefaultBoard, checkWinner } from '../utils/commonUtils';

const DEFAULT_GAME_STATE = { gameDraw: false, playerWon: null };

function Board({ size, handleChangeBoard = noop }) {
  const [board, setBoard] = useState(getDefaultBoard(size));
  const [isXNext, setIsXNext] = useState(getPlayer(true));
  const [{ playerWon , gameDraw}, setGameState] = useState(DEFAULT_GAME_STATE);

  // { message: (() => gameStates.playerChance(getPlayer(true)))(), color: gameStateColor.CHANCE }
  const handleUserClick = useRef();

  handleUserClick.current = (e) => {
    const row = +e.target?.getAttribute('data-row');
    const col = +e.target?.getAttribute('data-col')
    if (board[row][col] || playerWon || gameDraw) return;
    const newState = [...board];
    const currPlayer = getPlayer(isXNext);
    newState[row][col] = currPlayer;
    setBoard(newState)
    const { isGameDone = false, playerWon: wonBy = null } = checkWinner(size, newState);
    setGameState({ playerWon: wonBy, gameDraw: isGameDone })
    setIsXNext(!isXNext)
  }

  const handleReset = () => {
    setBoard(getDefaultBoard(size));
    setIsXNext(true);
    setGameState(DEFAULT_GAME_STATE)
  }

  const { gameStatusText, textColor } = (() => {
    let textColor = gameStateData.playerChance.color;
    let gameStatusText = gameStateData.playerChance.text(getPlayer(isXNext));

    if (playerWon) {
      textColor = gameStateData.playerWon.color;
      gameStatusText = gameStateData.playerWon.text(playerWon);
    } else if (gameDraw) {
      textColor = gameStateData.gameDraw.color;
      gameStatusText = gameStateData.gameDraw.text();
    } else {
      textColor = gameStateData.playerChance.color;
      gameStatusText = gameStateData.playerChance.text(getPlayer(isXNext));
    }
    return ({ textColor, gameStatusText });
  })()

  return (
    <>
      <Text variant='h2' text={gameStatusText} classes={`w-auto text-center mb-2 uppercase ${textColor} ${playerWon ? 'text-3xl' : ''}`} />
      {/* using event delegation to reduce the extra event listeners */}
      <div className={`grid grid-cols-${size} grid-rows-${size} border border-black w-max`} onClick={handleUserClick.current}>
        {!!board?.length && board?.map((row, rowId) => {
          return row?.map((cell, colId) => {
            return <Button key={`${rowId}_${colId}`}
              data-row={rowId}
              data-col={colId}
              disabled={cell || gameDraw || playerWon} className={`w-10 h-10 border border-black p-1 cursor-pointer disabled:cursor-not-allowed ${gameDraw ? 'bg-red-100' :  ''}`} title={cell} />
          })
        })}
      </div>
      {(playerWon || gameDraw) &&<Text text={'Start a new game.'} classes={'my-2'}/>}
      <div className='flex justify-between mt-3'>
        <Button onClick={handleReset} title='Reset Board' className={'bg-red-500 font-normal text-sm p-1 rounded-md mx-1 text-white'}/>
        <Button onClick={() => handleChangeBoard(null,true)} title='Change Board' className={'bg-amber-700 font-normal text-sm p-1 rounded-md mx-1 text-white'} />
      </div>
    </>
  )
}

export default Board