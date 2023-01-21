let chessboard = document.getElementById('chessboard');
// let possibleToMoveTo = [];
let sizeOfBoard = 8;
let movesUsed = 0;
let moveHistory = [];
let squares = {};
// let currentSquare;
// let numSquaresHeight = numSquaresWidth;
const maxWidth = 800;
const maxPadding = 20;
const maxGap = 3;
const globalDebugLevel = 1;
// let lightColor = "#00ffff";
// let darkColor =  "#ee31db";
// let hintColor = "#fefa67";
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
        this.chessSquare.addEventListener("click", function listen(event) {
            debugMessage(1, this.id + " [" + event.target.innerHTML + "] [" + this.show() + "] clicked");
            this.getPossibleToMoveTo = getPossibleToMoveTo(this);
            if (this.possibleToMoveTo.includes(event.target.id) || movesUsed === 0) {
                moveHistory.push(document.getElementById(event.target.id));
            }
        });
    }

    show() {
        return "id: " + this.id + "\n" +
            "height: " + this.height + "\n" +
            "width: " + this.width + "\n" +
            "color: " + this.color + "\n" +
            "possibleToMoveTo: " + this.possibleToMoveTo + "\n" +
            "classList: " + this.classList + "\n";
    }
}

function getSizeAndGo() {
    sizeOfBoard = parseInt(document.getElementById("setup-input").value);
    document.getElementById("setup-input").value = sizeOfBoard;
    createBoard();
}

/**
 * draw chessboard on screen according to colors and values of numSquaresHeight and numSquaresWidth
 * also resizes according to viewport size
 */
function createBoard() {
    chessboard.innerHTML = "";
    debugMessage(1, "\tcreateBoard() start", true);
    debugMessage(1, "window.innerWidth = " + window.innerWidth);
    debugMessage(1, "window.innerHeight = " + window.innerHeight);
    let screenwidth = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    if (screenwidth > maxWidth)
        screenwidth = maxWidth;
    debugMessage(1, "sizeOfBoard = " + sizeOfBoard);
    let boardPadding = Math.floor(screenwidth / 30);
    if (boardPadding > maxPadding)
        boardPadding = maxPadding;
    let gridGap = Math.floor(screenwidth / 120);
    if (gridGap > maxGap)
        gridGap = maxGap;
    let boardWidth = Math.floor(screenwidth) - (boardPadding * 2);
    let sqWidth = Math.floor((boardWidth - (gridGap * sizeOfBoard)) / sizeOfBoard);
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
    chessboard.style.gridTemplateColumns = "repeat(" + sizeOfBoard + ", 1fr)";
    chessboard.style.gap = gridGap + "px";
    chessboard.style.padding = boardPadding + "px";
    addSquaresToBoard(sizeOfBoard, sqWidth);
}

function addSquaresToBoard(sizeOfBoard, sqWidth) {
    let square = "fred";
    for (var i = 0; i < sizeOfBoard; i++) {
        for (var j = 0; j < sizeOfBoard; j++) {
            // let chessSquare = document.createElement('div');
            // chessSquare.className = 'square';
            // chessSquare.style.width = sqHeight + "px";
            // chessSquare.style.height = sqHeight + "px";
            // chessSquare.id = getSquareId(i, j);
            // setSquareColor(chessSquare);
            // chessboard.appendChild(chessSquare);
            // console.log("added id " + chessSquare.id);
            square = new Square(i, j, sqWidth);
            squares[square.id] = square;
            chessboard.appendChild(square.chessSquare);
        }
    }
    // document.addEventListener("click", function listenAllSquares(event) {
    //     debugMessage(1, "clicked: " + event.target.id);
    //     if (possibleToMoveTo.includes(event.target.id) || movesUsed === 0) {
    //         moveHistory.push(document.getElementById(event.target.id));
    //           setCurrentPosition();
    //     }
    // });
    debugMessage(1, "\tcreateBoard() end");
}

function getPossibleToMoveTo(square) {
    debugMessage(1, "\tgetPossibleToMoveTo start");
    let possibleToMoveTo = [];
    let moves = [-1, -2, -1, 2, -2, -1, -2, 1, 1, -2, 1, 2, 2, -1, 2, 1];
    for (let m = 0; m < moves.length; m += 2) {
        let v = moves[m];
        let h = moves[m + 1];
        if (this.isSquareInsideBoard(square.colNum + v, square.rowNum + h)) {
            if (!isVisited(square)) {
                possibleToMoveTo.push((col + v) + "-" + (row + h));
            }
        }
    }
    console.log("possibleToMoveTo = " + possibleToMoveTo);
    for (sq in possibleToMoveTo) {
        let squareElement = document.getElementById(possibleToMoveTo[sq]);
        squareElement.style.backgroundColor = hintColor;
    }
    // if no possible moves - game over
    if (possibleToMoveTo.length === 0) {
        console.log("gameOver()");
    }
    debugMessage(1, "\tgetPossibleToMoveTo end");
    return possibleToMoveTo;

}

function isVisited(square) {
    if (square.classList.contains("knight")) {
        return true;
    }
    return false;
}

function isSquareInsideBoard(square) {
    debugMessage(1, "isSquareInsideBoard " + square.id);
    if (square.rowNum < sizeOfBoard && square.colNum < sizeOfBoard && square.rowNum > 0 && square.colNum > 0) {
        return true;
    }
    return false;
}


/**
 *
 * @param {*} n1 - an index from the build loop - the row number
 * @param {*} n2 - an index from the build loop - the column number
 * @returns - concatenated string n1-n2
 */
function getSquareId(n1, n2) {
    return (n1 + 1) + "-" + (n2 + 1);
}

/**
 *
 * @param {*} squareElement can be the dom Element of one of the squares on the board - or its id
 * sets the color according to its id - if the sum of the 2 numbers is even - its a dark square - otherwise its light
 */
function setSquareColor(squareElement) {
    debugMessage(2, "setSquareColor() start");
    // if input is a string get the elemenet from the document
    if (typeof squareElement === "string") {
        squareElement = document.getElementById(squareElement);
    }
    let n1 = parseInt(squareElement.id.split("-")[0]);
    let n2 = parseInt(squareElement.id.split("-")[1]);

    if ((n1 + n2) % 2 !== 0) {
        debugMessage(3, "setting [" + squareElement.id + "] to darkColor [" + darkColor + "]")
        squareElement.style.backgroundColor = darkColor;
    } else {
        debugMessage(3, "setting [" + squareElement.id + "] to lightColor [" + lightColor + "]")
        squareElement.style.backgroundColor = lightColor;
    }
    debugMessage(3, "color of [" + squareElement.id + "] is [" + squareElement.style.backgroundColor + "]")
    debugMessage(3, "color of [" + squareElement.id + "] is [" + rgb2hex(squareElement.style.backgroundColor) + "]")
    debugMessage(2, "setSquareColor() end");
}

/**
 *
 * @param {} debugLevel
 * @param {*} message
 * controls what is logged to the console according to the constant globalDebugLevel and the passed argument debugLevel
 * feeds debugLevel without a new line
 */
function debugMessage(debugLevel, message) {
    debugMessage(debugLevel, message, false);
}

/**
 *
 * @param {*} debugLevel
 * @param {*} message
 * @param {*} newLine
 * controls what is logged to the console according to the constant globalDebugLevel and the passed argument debugLevel
 * feeds debugLevel with a new line
 */
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

/**
 *
 * @param {*} rgb
 * @returns the detected rgb color as a hex code
 */
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

document.getElementById("setup-button").addEventListener("click", function (event) {
    getSizeAndGo();
});
document.getElementById("setup-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        getSizeAndGo();
});
createBoard();

/**
 * driven from event listener click on square
 * adds the knight icon to the square and calls getPossibleToMoveTo() to find nectpossible moves
 */
// function setCurrentPosition() {
//     debugMessage(2, "\n\tsetCurrentPosition start");
//     // set previous square's knight to black
//     if (moveHistory.length > 1) {
//         let lastSq = moveHistory[moveHistory.length - 2];
//         lastSq.getElementsByClassName("fa-chess-knight")[0].style.color = usedColor;
//         debugMessage(3, "removing square ref [" + lastSq.id + "] from moveHistory");
//     }
//     currentSquare = moveHistory[moveHistory.length - 1];
//     debugMessage(3, "currentSquare = [" + currentSquare.id + "]");
//
//     // increment the number of moves
//     movesUsed++;
//     // put knight in square
//     currentSquare.innerHTML = "<i class='fa-solid fa-chess-knight'></i>";
//     currentSquare.getElementsByClassName("fa-chess-knight")[0].style.color = "blue";
//     debugMessage(3, "currentSquare.style.height = " + currentSquare.style.height);
//     // change size of knight according to square size
//     changeFontAwesomeFontSize();
//     // set the square background to remove the hint color
//     setSquareColor(currentSquare);
//     debugMessage(3, "currentSquare " + typeof currentSquare);
//     debugMessage(3, "currentSquare move[" + movesUsed + "] = " + currentSquare.id);
//     // add formatting to square - also use classList.contins('knight') to see if its been visited already
//     currentSquare.classList.add("knight");
//     debugMessage(3, "possibleToMoveTo = [" + possibleToMoveTo.length + "] " + possibleToMoveTo);
//     // remove this square from the possible moves so we calculated before this move - no longer needed
//     // possibleToMoveTo = possibleToMoveTo.filter(item => item !== currentSquare.id)
//     getPossibleToMoveTo();
//     debugMessage(2, "\tsetCurrentPosition end");
// }
//
// /**
//  * changes font awesome font size for the knight in the square according to the size of the square
//  * sets the font size to the square size - 10
//  */
// function changeFontAwesomeFontSize() {
//     debugMessage(2, "\tchangeFontAwesomeFontSize start");
//     const numberPattern = /\d+/g;
//     debugMessage(3, "currentSquare.height = " + currentSquare.style.height);
//     let squareSize = currentSquare.style.height.match(numberPattern);
//     debugMessage(3, "squareSize = " + squareSize);
//     let fontSize = (squareSize - 10) + "px";
//     debugMessage(3, "fontSize = " + fontSize);
//     currentSquare.style.fontSize = (squareSize - 10) + "px";
//     debugMessage(2, "\tchangeFontAwesomeFontSize end");
// }
//
// /**
//  * gets the current global possibleToMoveTo array and removes hintColour from them
//  * gets all the squares me can move to from from currentSquare, puts them into global possibleToMoveTo array
//  * and sets them with hintColor background
//  */
// function getPossibleToMoveTo() {
//     debugMessage(2, "\tgetPossibleToMoveTo start");
//     clearOldPossibleMoves();
//     let col = parseInt(currentSquare.id.split("-")[0]);
//     let row = parseInt(currentSquare.id.split("-")[1]);
//     let moves = [-1, -2, -1, 2, -2, -1, -2, 1, 1, -2, 1, 2, 2, -1, 2, 1];
//     for (let m = 0; m < moves.length; m += 2) {
//         let v = moves[m];
//         let h = moves[m + 1];
//         if (isSquareInsideBoard(col + v, row + h)) {
//             let coord = (col + v) + "-" + (row + h);
//             if (!isVisited(coord)) {
//                 possibleToMoveTo.push((col + v) + "-" + (row + h));
//             }
//         }
//     }
//     for (sq in possibleToMoveTo) {
//         let squareElement = document.getElementById(possibleToMoveTo[sq]);
//         squareElement.style.backgroundColor = hintColor;
//     }
//     // if no possible moves - game over
//     if (possibleToMoveTo.length === 0) {
//         gameOver();
//     }
//     debugMessage(2, "\tgetPossibleToMoveTo end");
// }
//
// /**
//  * are co-ordinates v - inside the limits of the board height and width
//  * @param {*} v
//  * @param {*} h
//  * @returns
//  */
// function isSquareInsideBoard(v, h) {
//     debugMessage(2, "isSquareInsideBoard " + v + "/" + h);
//     if (h < width + 1 && v < height + 1 && h > 0 && v > 0) {
//         return true;
//     }
//     return false;
// }
//
// /**
//  * have this square been visited - accents square element or string id
//  * @param {*} el
//  * @returns
//  */
// function isVisited(el) {
//     if (typeof el === "string") {
//         el = document.getElementById(el);
//     }
//     if (el.classList.contains("knight")) {
//         return true;
//     }
//     return false;
// }
//
// /**
//  * removes hintColor from unpicked squares in possibleToMoveTo - and empties array
//  */
// function clearOldPossibleMoves() {
//     debugMessage(2, "\tclearOldPossibleMoves start");
//     debugMessage(3, "clearing " + possibleToMoveTo);
//     for (sq in possibleToMoveTo) {
//         debugMessage(3, "square: " + possibleToMoveTo[sq]);
//         if (!isVisited(possibleToMoveTo[sq])) {
//             setSquareColor(possibleToMoveTo[sq]);
//         }
//     }
//     possibleToMoveTo = [];
//     debugMessage(2, "\tclearOldPossibleMoves end");
// }
//
// /**
//  * game over
//  */
// function gameOver() {
//     debugMessage(2, "movesUsed = " + movesUsed);
//     let moves = "";
//     for (sq in moveHistory)
//         moves += moveHistory[sq].id + ","
//     if (movesUsed == height * width) {
//         document.getElementById("gameover").textContent = "You completed a Knight's Tour of " + height + " by " + width + ".\n your moves were " + moves;
//     } else {
//         document.getElementById("gameover").textContent = "Game Over - there are no more moves available.\nYou made " + movesUsed + " moves out of a possible " + (height * width) + ".\nYour moves were " + moves;
//     }
// }