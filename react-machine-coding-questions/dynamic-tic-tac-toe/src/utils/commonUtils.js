export const gameStates = {
    playerChance: (player) => `Player ${player}'s chance`,
    playerWon: (player) => `Player ${player} Won`,
    gameDraw: () => 'Game Draw',
};


export const getPlayer = (isXNext) => isXNext ? 'X' : 'O';

export const getDefaultBoard = (size) => Array.from({ length: size }, (_) => Array.from({ length: size }, (_) => null));

export const checkWinner = (size, board) => {
    let rowIndex = 0;
    let isGameDone = false;
    let filledRowsCount = 0;
    let leftDiagonalArr = [], rightDiagonalArr = [];
    let leftDiagonal = 0, rightDiagonal = 1;

    for (rowIndex; rowIndex < size; rowIndex++) {
        let currRow = board[rowIndex];
        //  check for row first
        if (!!currRow[0] && currRow.every(cell => !!cell && cell === currRow[0])) {
            return {
                isGameDone, playerWon: board[rowIndex][0]
            };
        }

        //  check for column now
        const firstColCell = board[0][rowIndex];
        if (firstColCell) {
            let colIndex = 1;
            let sameEntriesCount = 1;

            for (colIndex; colIndex < size; colIndex++) {
                if (!!firstColCell && firstColCell === board[colIndex][rowIndex]) {
                    sameEntriesCount += 1;
                }
            }

            if (sameEntriesCount === size) {
                return {
                    isGameDone, playerWon: firstColCell
                }
            };

        }

        //  check for diagonals on once in the given data
        if (!!board[rowIndex][leftDiagonal] || !!board[rowIndex][size - rightDiagonal]) {
            // creating diagonals only in first iteration when 1st rowIndex is 0 to avoid unnecessary iterations
            let row = rowIndex;

            while (leftDiagonal < size && rowIndex === 0) {
                leftDiagonalArr.push(board[row][leftDiagonal])
                rightDiagonalArr.push(board[row][size - rightDiagonal]);
                leftDiagonal++;
                row++;
                rightDiagonal++;
            }
            if (!!leftDiagonalArr[0] && leftDiagonalArr.every(cell => !!cell && leftDiagonalArr[0] === cell)) {
                return { isGameDone, playerWon: leftDiagonalArr[0] };
            }
            if (!!rightDiagonalArr[0] && rightDiagonalArr.every(cell => !!cell && rightDiagonalArr[0] === cell)) {
                return { isGameDone, playerWon: rightDiagonalArr[0] }
            }
        }
        // Check to find if game is draw & all cells are filled 
        if (currRow.every(cell => cell !== null)) {
            filledRowsCount += 1;
        }
    }

    return { isGameDone: filledRowsCount === size, playerWon: null };
};

export const gameStateColor = {
    WON: 'text-green-500',
    CHANCE: 'text-orange-500',
    DRAW: 'text-red-500',
}

export const gameStateData = {
    playerChance: {text: gameStates.playerChance, color: gameStateColor.CHANCE},
    playerWon: { text: gameStates.playerWon, color: gameStateColor.WON },
    gameDraw: { text: gameStates.gameDraw, color: gameStateColor.DRAW },
}