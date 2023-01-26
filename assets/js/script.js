let chessboard = document.getElementById('chessboard');
let possibleToMoveTo = [];
let movesUsed = 0;
let allSquares = {};
let moveHistory = [];
let currentSquare;
let height = 8;
let width = 8;
const globalDebugLevel = 0;
const imageset = 3;
let lightColor = "#ffffff";
let darkColor = "#C0C0C0";
let hintColor = "#00ff00";
let usedColor = "#ff0000";

createBoard();

function createBoard() {
    debugMessage(1, "\tcreateBoard() start", true);

    for (var i = 0; i < height; i++) {
        let row = document.createElement('div');
        row.classList.add("row");
        chessboard.appendChild(row);
        for (var j = 0; j < width; j++) {
            let chessSquare = document.createElement('div');
            chessSquare.classList.add('square');
            chessSquare.id = i + "-" + j;
            setSquareColor(chessSquare);
            row.appendChild(chessSquare);
            chessSquare.innerHTML = '<img src="../assets/images/knights-set' + imageset + '/blank.png">';
            allSquares[chessSquare.id] = chessSquare;
        }
    }
    debugMessage(1, "screen width = " + window.innerWidth);
    debugMessage(1, "screen height = " + window.innerHeight);
    debugMessage(1, "height = " + height);
    debugMessage(1, "width = " + width);
    debugMessage(1, "lightColor = " + lightColor);
    debugMessage(1, "darkColor = " + darkColor);
    debugMessage(1, "hintColor = " + hintColor);
    debugMessage(1, "1-1 scrollWidth = " + document.getElementById("1-1").scrollWidth);
    debugMessage(1, "1-1 scrollHeight = " + document.getElementById("1-1").scrollHeight);
    document.addEventListener("click", function (event) {
        if (movesUsed === 0 || possibleToMoveTo.includes(event.target.parentElement)) {
            debugMessage(1, "clicked " + event.target.parentElement.id);
            moveHistory.push(document.getElementById(event.target.parentElement.id));
            setCurrentPosition();
        }
    });
    debugMessage(1, "\tcreateBoard() end");
}

function setSquareColor(squareElement) {
    debugMessage(2, "setSquareColor() start");
    // if (typeof squareElement === "string") {
    //     squareElement = document.getElementById(squareElement);
    // }
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
    debugMessage(2, "setSquareColor() end");
}

function setCurrentPosition() {
    debugMessage(2, "\n\tsetCurrentPosition start");
    if (moveHistory.length > 1) {
        let lastSq = moveHistory[moveHistory.length - 2];

        for (mh in moveHistory)
            console.log("moveHistory = " + moveHistory[mh].id);
        addKnightImgToSquare(lastSq.id, "red");
        debugMessage(3, "removing square ref [" + lastSq.id + "] from moveHistory");
    }
    currentSquare = moveHistory[moveHistory.length - 1];
    debugMessage(3, "currentSquare = [" + currentSquare.id + "]");

    movesUsed++;
    addKnightImgToSquare(currentSquare.id, "blue");
    setSquareColor(currentSquare);
    debugMessage(3, "currentSquare " + typeof currentSquare);
    debugMessage(3, "currentSquare move[" + movesUsed + "] = " + currentSquare.id);
    currentSquare.classList.add("knight");
    debugMessage(3, "possibleToMoveTo = [" + possibleToMoveTo.length + "] " + possibleToMoveTo);
    getPossibleToMoveTo();
    debugMessage(2, "\tsetCurrentPosition end");
}


// function addKnightToSquare() {
//     let scrollWidth = currentSquare.scrollWidth;
//     currentSquare.style.maxWidth = scrollWidth + "px";
//     console.log("currentSquare scrollWidth before knight = " + currentSquare.scrollWidth);
//     console.log("currentSquare scrollHeight before knight = " + currentSquare.scrollHeight);
//     currentSquare.innerHTML = '<img src="assets/images/blue-knight-r.png" alt="blue knight">';
//     debugMessage(2, "\tchangeFontAwesomeFontSize end");
// }

function addKnightImgToSquare(id, color) {
    console.log("addKnightImgToSquare(" + id + ", " + color + ")");
    let sq = document.getElementById(id);
    switch (color) {
        case "red":
            sq.style.backgroundImage = "url(../assets/images/knights-set" + imageset + "/red-knight-l.png)";
            break;
        default:
            sq.style.backgroundImage = "url(../assets/images/knights-set" + imageset + "/blue-knight-l.png)";
            break;

    }
    sq.classList.add("knight" + color);
    console.log("addKnightImgToSquare(" + id + ", " + color + ") done");

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
        if (isSquareInsideBoard(col + v, row + h)) {
            let coord = (col + v) + "-" + (row + h);
            if (!isVisited(coord)) {
                console.log("pushing: " + (col + v) + "-" + (row + h));
                possibleToMoveTo.push(allSquares[(col + v) + "-" + (row + h)]);
            }
        }
    }
    console.log("possibleToMoveTo.length = " + possibleToMoveTo.length);
    for (sq in possibleToMoveTo) {
        console.log("possible squares = " + possibleToMoveTo[sq].id);
        // let squareElement = document.getElementById(possibleToMoveTo[sq]);
        // squareElement.style.backgroundColor = hintColor;
        possibleToMoveTo[sq].style.backgroundColor = hintColor;
    }

    if (possibleToMoveTo.length === 0) {
        gameOver();
    }
    debugMessage(1, "\tgetPossibleToMoveTo end");
}


function isSquareInsideBoard(v, h) {
    debugMessage(1, "isSquareInsideBoard " + v + "/" + h);
    if (h < width + 1 && v < height + 1 && h > 0 && v > 0) {
        console.log("returning: " + true);
        return true;
    }
    console.log("returning: " + false);
    return false;
}

function isVisited(el) {
    if (typeof el === "string") {
        el = document.getElementById(el);
    }
    if (el.classList.contains("knight")) {
        return true;
    }
    return false;
}

function clearOldPossibleMoves() {
    debugMessage(2, "\tclearOldPossibleMoves start");
    debugMessage(3, "clearing " + possibleToMoveTo);
    for (sq in possibleToMoveTo) {
        debugMessage(3, "square: " + possibleToMoveTo[sq]);
        if (!isVisited(possibleToMoveTo[sq])) {
            setSquareColor(possibleToMoveTo[sq]);
        }
    }
    possibleToMoveTo = [];
    debugMessage(2, "\tclearOldPossibleMoves end");
}

function gameOver() {
    debugMessage(2, "movesUsed = " + movesUsed);
    let moves = "";
    for (sq in moveHistory)
        moves += moveHistory[sq].id + ","
    if (movesUsed == height * width) {
        document.getElementById("gameover").textContent = "You completed a Knight's Tour of " + height + " by " + width + ".\n your moves were " + moves;
    } else {
        document.getElementById("gameover").textContent = "Game Over - there are no more moves available.\nYou made " + movesUsed + " moves out of a possible " + (height * width) + ".\nYour moves were " + moves;
    }
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