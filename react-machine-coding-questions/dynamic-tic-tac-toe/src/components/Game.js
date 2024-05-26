import React, { useState, useRef } from 'react';
import Select from './common/Select';
import Board from "./Board"
import Button from './common/Button'

const boardSizeOptions = [3,4,5,6,7,8,9,10]

function Game() {
    const [size, setSize] = useState(boardSizeOptions[0]);
    const [showBoard, setShowBoard] = useState(false); 

    let handleBoardSizeChange = useRef();

    handleBoardSizeChange.current = (e) => {
        const val = +e?.target?.value;
        if (val) setSize(val)
    }
    
    const toggleBoardShow = (e,resetSize = false) => {
        if (resetSize) setSize(boardSizeOptions[0])
        setShowBoard(prev => !prev);
    };

    return (
        <main className='flex justify-center flex-col items-center'>
            {!showBoard &&
                <div className='flex justify-center flex-col items-center'>

                    <Select value={size} onChange={handleBoardSizeChange.current} inputClasses={`ml-2 pl-1 border border-grey-500 focus:outline-green-500`} options={boardSizeOptions} label='Select Board Size' labelClasses='text-grey-500' name='boardSize' />
                    
                    <Button title='Show Board' className='bg-slate-400 px-1 rounded w-max mt-3 text-white text-md disabled:bg-slate-100' disabled={!size} onClick={toggleBoardShow}/>
                </div>}
            {size && showBoard && <Board size={size} handleChangeBoard={toggleBoardShow}/>}
        </main>
    )
}

export default Game