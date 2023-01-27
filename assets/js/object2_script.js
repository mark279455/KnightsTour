let chessboard = document.getElementById('chessboard');
let boardSize = 8;
let movesUsed = 0;
let moveHistory = [];
let squareClasses = {};
const minBoardSize = 3;
const maxBoardSize = 15;
const maxWidth = 800;
const maxPadding = 20;
const maxGap = 3;
const globalDebugLevel = 1;
let lightColor = "#ffffff";
let darkColor = "#C0C0C0";
let hintColor = "#00ff00";
let usedColor = "#ff0000";


class Square {
    constructor(rowNum, colNum, width) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.id = rowNum + "-" + colNum;
        this.height = width + "px";
        this.width = width + "px";
        this.possibleToMoveTo = [];
        this.classList = ['square'];
        this.color = lightColor;
        if ((rowNum + colNum) % 2 !== 0) {
            this.color = darkColor;
        }
        this.chessSquare = document.createElement('div');
        this.chessSquare.style.width = this.width;
        this.chessSquare.style.height = this.height;
        this.chessSquare.style.backgroundColor = this.color;
        this.chessSquare.id = this.id;
        // shows square ids in square - for debugging only
        this.chessSquare.style.fontSize = "0.8rem";
        this.chessSquare.textContent = this.id;
    }

    toString() {
        return "id: " + this.id + "\n" +
            "rowNum: " + this.rowNum + "\n" +
            "colNum: " + this.colNum + "\n" +
            "height: " + this.height + "\n" +
            "height: " + this.height + "\n" +
            "width: " + this.width + "\n" +
            "color: " + this.color + "\n" +
            "possibleToMoveTo: " + this.possibleToMoveTo + "\n" +
            "classList: " + this.classList + "\n";
    }
}

function getSizeAndGo() {
    boardSize = parseInt(document.getElementById("setup-input").value);
    if (boardSize > maxBoardSize) {
        boardSize = maxBoardSize;
    }
    if (boardSize < minBoardSize) {
        boardSize = minBoardSize;
    }
    document.getElementById("setup-input").value = boardSize;
    moveHistory = [];
    squareClasses = {};
    createBoard();
}

function addEventListenerToSquare(squareClass) {
    squareClass.chessSquare.addEventListener("click", function listen(event) {
        debugMessage(1, squareClass.id + " clicked");

        if (moveHistory.length < 1 || moveHistory[moveHistory.length - 1].possibleToMoveTo.includes(squareClasses[event.target.id])) {
            // do we have squares to unHint?
            if (moveHistory.length > 0) {
                resetSquareColors();
                moveHistory[moveHistory.length - 1].chessSquare.getElementsByClassName("fa-chess-knight")[0].style.color = "red";
            }
            addKnight(squareClass);
            squareClass.getPossibleToMoveTo = getPossibleToMoveTo(squareClass);
            if (squareClass.possibleToMoveTo.includes(squareClasses[event.target.id]) || movesUsed === 0) {
                moveHistory.push(squareClasses[event.target.id]);
            }
        } else {
            console.log("no operation");
        }
    });
}

function addKnight(squareClass) {
    squareClass.chessSquare.innerHTML = "<i class='fa-solid fa-chess-knight'></i>";
    squareClass.chessSquare.getElementsByClassName("fa-chess-knight")[0].style.color = "blue";
    squareClass.chessSquare.classList.add("knight");
    changeFontAwesomeFontSize(squareClass);
}

function resetSquareColors() {
    debugMessage(1, "\tresetSquareColors start");
    if (moveHistory.length > 0) {
        // showMoveHistory();
        let squareArray = moveHistory[moveHistory.length - 1].possibleToMoveTo;
        for (m in squareArray) {
            squareArray[m].chessSquare.style.backgroundColor = squareArray[m].color;
        }
        debugMessage(1, "\tresetSquareColors end");
    }
}

// function showMoveHistory() {
//     console.log("moveHistory:");
//     for (let i = 0; i < moveHistory.length; i++)
//         console.log(moveHistory[i].id);
//     console.log("#######################");
// }

function createBoard() {
    chessboard.innerHTML = "";
    debugMessage(1, "\tcreateBoard() start", true);
    debugMessage(1, "window.innerWidth = " + window.innerWidth);
    debugMessage(1, "window.innerHeight = " + window.innerHeight);
    let screenwidth = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    if (screenwidth > maxWidth)
        screenwidth = maxWidth;
    debugMessage(1, "sizeOfBoard = " + boardSize);
    let boardPadding = Math.floor(screenwidth / 30);
    if (boardPadding > maxPadding)
        boardPadding = maxPadding;
    let gridGap = Math.floor(screenwidth / 120);
    if (gridGap > maxGap)
        gridGap = maxGap;
    let boardWidth = Math.floor(screenwidth) - (boardPadding * 2);
    let sqWidth = Math.floor((boardWidth - (gridGap * boardSize)) / boardSize);
    let sqHeight = sqWidth;
    let boardHeight = boardWidth;
    chessboard.style.width = boardWidth + "px";
    chessboard.style.height = boardHeight + "px";
    debugMessage(1, "boardWidth = " + boardWidth);
    debugMessage(1, "chessboard.style.width = " + chessboard.style.width);
    debugMessage(1, "boardHeight = " + boardHeight);
    debugMessage(1, "chessboard.style.height = " + chessboard.style.height);
    debugMessage(1, "boardPadding = " + boardPadding);
    debugMessage(1, "gridGap = " + gridGap);
    debugMessage(1, "sqWidth = " + sqWidth);
    debugMessage(1, "sqHeight = " + sqHeight);
    chessboard.style.gridTemplateColumns = "repeat(" + boardSize + ", 1fr)";
    chessboard.style.gap = gridGap + "px";
    chessboard.style.padding = boardPadding + "px";
    addSquaresToBoard(boardSize, sqWidth);
}

function addSquaresToBoard(sizeOfBoard, sqWidth) {
    for (var i = 0; i < sizeOfBoard; i++) {
        for (var j = 0; j < sizeOfBoard; j++) {
            let square = new Square(i + 1, j + 1, sqWidth);
            addEventListenerToSquare(square);
            squareClasses[square.id] = square;
            chessboard.appendChild(square.chessSquare);
        }
    }
    debugMessage(1, "\tcreateBoard() end");
}

function getPossibleToMoveTo(squareClass) {
    debugMessage(1, "\tgetPossibleToMoveTo start");
    let moves = [-1, -2, -1, 2, -2, -1, -2, 1, 1, -2, 1, 2, 2, -1, 2, 1];
    for (let m = 0; m < moves.length; m += 2) {
        let v = moves[m];
        let h = moves[m + 1];
        let possibleSquare = squareClasses[(squareClass.rowNum + v) + "-" + (squareClass.colNum + h)];
        if (possibleSquare !== undefined) {
            if (!isVisited(possibleSquare.chessSquare)) {
                squareClass.possibleToMoveTo.push(possibleSquare);
            }
        }
    }
    for (sq in squareClass.possibleToMoveTo) {
        squareClass.possibleToMoveTo[sq].chessSquare.style.backgroundColor = hintColor;
    }
    if (squareClass.possibleToMoveTo.length === 0) {
        console.log("gameOver()");
    }
    debugMessage(1, "\tgetPossibleToMoveTo end");
}

// function isVisited(square) {
//     if (square.classList.contains("knight")) {
//         return true;
//     }
//     return false;
// }

function debugMessage(debugLevel, message) {
    debugMessage(debugLevel, message, false);
}

function debugMessage(debugLevel, message, newLine) {
    if (debugLevel > 0) {
        if (debugLevel <= globalDebugLevel) {
            if (newLine) {
                console.log("\n" + message);
            } else {
                console.log(message);
            }
        }
    }
}

function changeFontAwesomeFontSize(squareClass) {
    debugMessage(2, "\tchangeFontAwesomeFontSize start");
    const numberPattern = /\d+/g;
    debugMessage(3, "currentSquare.height = " + squareClass.chessSquare.style.height);
    let squareSize = squareClass.chessSquare.style.height.match(numberPattern);
    debugMessage(3, "squareSize = " + squareSize);
    let fontSize = (squareSize - 10) + "px";
    debugMessage(3, "fontSize = " + fontSize);
    squareClass.chessSquare.style.fontSize = (squareSize - 10) + "px";
    debugMessage(2, "\tchangeFontAwesomeFontSize end");
}

document.getElementById("setup-button").addEventListener("click", function (event) {
    getSizeAndGo();
});
document.getElementById("setup-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        getSizeAndGo();
});
createBoard();