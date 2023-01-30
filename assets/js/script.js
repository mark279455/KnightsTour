let chessBoard = document.getElementById('chessboard');
let movesUsed = 0;
let currentSquare;
let possibleToMoveTo = [];
let allSquares = {};
let moveHistory = [];
let boardSize = 8;
const minBoardSize = 3;
const maxBoardSize = 15;
const maxWidth = 700;
const maxPadding = 20;
const maxGap = 3;
const globalDebugLevel = 0;
let imageSet = 3;
let lightColor = "#ffffff";
let darkColor = "#C0C0C0";
let hintColor = "#00ff00";
let woodColor = "#966f33";

createBoard();

function createBoard() {
    debugMessage(1, "\tcreateBoard() start", true);
    let screenWidth = window.innerWidth;
    imageSet = Math.floor((Math.random() * 3) + 1);
    for (var i = 0; i < boardSize; i++) {
        let row = document.createElement('div');
        row.classList.add("row");
        chessBoard.appendChild(row);
        for (var j = 0; j < boardSize; j++) {
            let chessSquare = document.createElement('div');
            chessSquare.classList.add('square');
            chessSquare.id = i + "-" + j;
            setSquareColor(chessSquare);
            row.appendChild(chessSquare);
            chessSquare.innerHTML = '<img src="./assets/images/knights-set' + imageSet + '/blank.png">';
            allSquares[chessSquare.id] = chessSquare;
        }
    }
    debugMessage(1, "screen width = " + window.innerWidth);
    debugMessage(1, "screen height = " + window.innerHeight);
    debugMessage(1, "boardsize = " + boardSize);
    if (screenWidth > maxWidth) {
        chessBoard.style.width = maxWidth + "px";
        chessBoard.style.maxWidth = maxWidth + "px";
    }
    document.addEventListener("click", function allSquares(event) {
        if (event.target.parentElement.id && (movesUsed === 0 || possibleToMoveTo.includes(event.target.parentElement))) {
            debugMessage(1, "clicked " + event.target.parentElement.id);
            moveHistory.push(document.getElementById(event.target.parentElement.id));
            setCurrentPosition();
        }
    });
    debugMessage(1, "\tcreateBoard() end");
}

function setSquareColor(chessSquare) {
    debugMessage(2, "setSquareColor() start");
    let n1 = parseInt(chessSquare.id.split("-")[0]);
    let n2 = parseInt(chessSquare.id.split("-")[1]);

    if ((n1 + n2) % 2 !== 0) {
        debugMessage(3, "setting [" + chessSquare.id + "] to darkColor [" + darkColor + "]")
        chessSquare.style.backgroundColor = darkColor;
    } else {
        debugMessage(3, "setting [" + chessSquare.id + "] to lightColor [" + lightColor + "]")
        chessSquare.style.backgroundColor = lightColor;
    }
    debugMessage(3, "color of [" + chessSquare.id + "] is [" + chessSquare.style.backgroundColor + "]")
    debugMessage(2, "setSquareColor() end");
}

function setCurrentPosition() {
    debugMessage(1, "\n\tsetCurrentPosition start");
    if (moveHistory.length > 1) {
        addKnightToSquare(getLastMove(), "red");
        debugMessage(3, "removing square ref [" + getLastMove().id + "] from moveHistory");
    }
    currentSquare = moveHistory[moveHistory.length - 1];
    debugMessage(3, "currentSquare = [" + currentSquare.id + "]");
    movesUsed++;
    addKnightToSquare(currentSquare, "blue");
    setSquareColor(currentSquare);
    debugMessage(3, "currentSquare move[" + movesUsed + "] = " + currentSquare.id);
    currentSquare.classList.add("knight");
    debugMessage(3, "possibleToMoveTo = [" + possibleToMoveTo.length + "] " + possibleToMoveTo);
    getPossibleToMoveTo();
    debugMessage(1, "\tsetCurrentPosition end");
}

function getLastMove() {
    return moveHistory[moveHistory.length - 2];
}

function addKnightToSquare(chessSquare, color, invert) {
    debugMessage(2, "addKnightToSquare(" + chessSquare.id + ", " + color + ", " + invert + ")");
    switch (color) {
        case "red":
            if (invert) {
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/red-knight-l-inv.png)";
            } else {
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/red-knight-l.png)";
            }
            break;
        default:
            if (invert) {
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/blue-knight-l-inv.png)";
            } else {
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/blue-knight-l.png)";
            }
            break;
    }
    debugMessage(2, "addKnightToSquare(" + chessSquare.id + ", " + color + ") done");
}

function getPossibleToMoveTo() {
    debugMessage(1, "\tgetPossibleToMoveTo start " + currentSquare.id);
    clearOldPossibleMoves();
    let col = parseInt(currentSquare.id.split("-")[0]);
    let row = parseInt(currentSquare.id.split("-")[1]);
    let moves = [-1, -2, -1, 2, -2, -1, -2, 1, 1, -2, 1, 2, 2, -1, 2, 1];
    for (let m = 0; m < moves.length; m += 2) {
        let v = moves[m];
        let h = moves[m + 1];
        let coord = (col + v) + "-" + (row + h);
        if (allSquares[coord]) {
            if (!isVisited(allSquares[coord])) {
                possibleToMoveTo.push(allSquares[coord]);
            }
        }
    }
    for (sq in possibleToMoveTo) {
        debugMessage(2, "possible squares = " + possibleToMoveTo[sq].id);
        possibleToMoveTo[sq].style.backgroundColor = hintColor;
    }

    if (possibleToMoveTo.length === 0) {
        gameOver();
    }
    debugMessage(1, "\tgetPossibleToMoveTo end");
}

function isVisited(chesssquare) {
    if (chesssquare.classList.contains("knight")) {
        return true;
    }
    return false;
}

function clearOldPossibleMoves() {
    debugMessage(1, "\tclearOldPossibleMoves start");
    debugMessage(3, "clearing " + possibleToMoveTo);
    for (sq in possibleToMoveTo) {
        debugMessage(3, "square: " + possibleToMoveTo[sq]);
        if (!isVisited(possibleToMoveTo[sq])) {
            setSquareColor(possibleToMoveTo[sq]);
        }
    }
    possibleToMoveTo = [];
    debugMessage(1, "\tclearOldPossibleMoves end");
}

function gameOver() {
    debugMessage(1, "gameOver() start");
    let moves = "";
    for (sq in moveHistory) {
        moves += moveHistory[sq].id + ","
    }
    moves = moves.substring(0, moves.length - 1);
    if (movesUsed == Math.pow(boardSize, 2)) {
        document.getElementById("gameover").textContent = "You completed a Knight's Tour of " + boardSize + " by " + boardSize + ".";
    } else {
        for (sq in moveHistory) {
            addKnightToSquare(moveHistory[sq], "red", true);
        }
        addKnightToSquare(currentSquare, "blue", true);
        document.getElementById("gameover").textContent = "Game Over - there are no more moves available. You made " + movesUsed + " moves out of a possible " + (Math.pow(boardSize, 2)) + ".";
    }
    document.getElementById("moves").textContent = "Your moves were " + moves;
}

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

function getSizeAndGo() {
    chessBoard.innerHTML = "";
    boardSize = parseInt(document.getElementById("setup-input").value);
    if (boardSize > maxBoardSize) {
        boardSize = maxBoardSize;
    }
    if (boardSize < minBoardSize) {
        boardSize = minBoardSize;
    }
    document.getElementById("setup-input").value = boardSize;
    moveHistory = [];
    allSquares = {};
    possibleToMoveTo = [];
    movesUsed = 0;
    document.getElementById("gameover").textContent = "";
    document.getElementById("moves").textContent = "";
    createBoard();
}

document.getElementById("setup-button").addEventListener("click", function (event) {
    getSizeAndGo();
});
document.getElementById("setup-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        getSizeAndGo();
});