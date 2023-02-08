// minimum size of board - kind of meaningless when less than 4
const minBoardSize = 4;
// maximum size of board - kind of meaningless when less than 4
const maxBoardSize = 15;
// max width of board - so that for bigger displays it doesnt get bigger and bigger
const maxWidth = 600;
// regular expression to test for square id
const validIdPattern = /\d+-\d+/;

// chessboard Element
let chessBoard = document.getElementById('chessboard');
// current square that we are on
let currentSquare;
// array of possible moves for knight to move to
let possibleToMoveTo = [];
// maps square id to square element - all squares in here
let allSquares = {};
// array of historical moves in this run
let moveHistory = [];
// boardsize - height and width the same
let boardSize = 8;
// which set of knights to use - 3 choices - randomised
let imageSet = 3;
// light squares on board
let lightColor = "#f0f0f0";
// dark squares on board
let darkColor = "#8FDBFF";
// highlighted squares - shows where we can move to
let hintColor = "#00ff00";

// create a board when the page loads - wait for DOM to load first
document.addEventListener("DOMContentLoaded", function () {
    createBoard();
});

/**
 * create the chessboard with the size of boardSize
 */
function createBoard() {
    let screenWidth = window.innerWidth;
    // randomise which knight images to use
    imageSet = Math.floor((Math.random() * 3) + 1);
    // for boardSize - height here
    for (var i = 0; i < boardSize; i++) {
        // create a div for each row
        let row = document.createElement('div');
        // add a row
        row.classList.add("row");
        // append the row to the board
        chessBoard.appendChild(row);
        // for boardSize - width here
        for (var j = 0; j < boardSize; j++) {
            // create a div for each square
            let chessSquare = document.createElement('div');
            // set the class square to the chessSquare
            chessSquare.classList.add('square');
            // set the unique id for the chessSquare e.g "4-6"
            chessSquare.id = i + "-" + j;
            // set the color of the chessSquare - light or dark
            setSquareColor(chessSquare);
            // append chessSquare to the row
            row.appendChild(chessSquare);
            // set an transparent image to the chessSquare
            chessSquare.innerHTML = '<img src="./assets/images/knights-set' + imageSet + '/blank.webp" alt="empty square ' + chessSquare.id + '">';
            // add the chessSquare to allSquares with its id
            allSquares[chessSquare.id] = chessSquare;
        }
    }
    // set board dimensions to max or min from constants
    if (screenWidth > maxWidth) {
        chessBoard.style.width = maxWidth + "px";
        chessBoard.style.maxWidth = maxWidth + "px";
    }
    // write instructions to info section
    writeInstructions();
    // add eventlistener to the document
    chessBoard.addEventListener("click", function (event) {
        // filter events:
        // if calling element's parent has an id AND its in possibleToMoveTo
        // OR
        // its our firt move AND it has a valid id
        if ((event.target.parentElement.id && possibleToMoveTo.includes(event.target.parentElement)) || moveHistory.length === 0 && (isValidId(event.target.parentElement.id))) {
            // push the calling element to our history
            moveHistory.push(document.getElementById(event.target.parentElement.id));
            // set currentSquare to the calling element
            setCurrentPosition();
        }
    });
}

/**
 * writes instructions to infosection #info1 #info2 and #info3
 */
function writeInstructions() {
    writeInfoSectionHeading("Instructions");
    document.getElementById("info1").textContent = 'Welcome to \"The Knight\'s Tour\". To play, you must move a chess Knight around the board, and land on every square without landing on the same square twice.';
    document.getElementById("info2").textContent = "The game will show you your available moves, and you can change the size of the board in the box above. The board can be from 4 x 4 to 15 x 15.";
    document.getElementById("info3").textContent = "Click on any square to start.";
}

/**
 * returns true if id is valid - format of (1 or 2 digits) + "-" + (1 or 2 digits)
 * uses constant validIdPattern
 * @param {*} id 
 * @returns 
 */
function isValidId(id) {
    return validIdPattern.test(id);
}

/**
 * writes heading of Instructions or Game Over Section (infosection)
 * @param {*} heading 
 */
function writeInfoSectionHeading(heading) {
    let infoSection = document.getElementById("infosection");
    let h2Elements = infoSection.querySelectorAll("h2");
    for (var i = 0; i < h2Elements.length; i++)
        h2Elements[i].textContent = heading;
}

/**
 *  set the chessSquare colour id from its id - light or dark
 * @param {*} chessSquare 
 */
function setSquareColor(chessSquare) {
    // get the numbers from the element's id
    let col = parseInt(chessSquare.id.split("-")[0]);
    let row = parseInt(chessSquare.id.split("-")[1]);

    // if col + row is even colour is dark
    if ((col + row) % 2 !== 0) {
        chessSquare.style.backgroundColor = darkColor;
    } else {
        // colour is light
        chessSquare.style.backgroundColor = lightColor;
    }
}

/**
 * deals with the currentSquare that we are on
 */
function setCurrentPosition() {
    // if we have historical moves - i.e. not first move
    if (moveHistory.length > 1) {
        // set historical knigh to red
        addKnightToSquare(getLastMove(), "red");
    }
    // currentSquare is last chessSquare added to history
    currentSquare = moveHistory[moveHistory.length - 1];
    // add a blue knigh to currentSquare
    addKnightToSquare(currentSquare, "blue");
    // overwrite the hint colour from this square being in possibleToMoveTo[]
    setSquareColor(currentSquare);
    // add "knight" to currentSquare classList
    currentSquare.classList.add("knight");
    // generate possibleToMoveTo[] for currentSquare
    getPossibleToMoveTo();
}

/**
 * 
 * @returns returns last move from history - not this move, which would be the last in the array - the one before that
 */
function getLastMove() {
    return moveHistory[moveHistory.length - 2];
}

/**
 * add a knight to the chessSquare
 * color is red or anything else - see default clause below
 * invert is true or false
 * @param {*} chessSquare
 * @param {*} color 
 * @param {*} invert 
 */
function addKnightToSquare(chessSquare, color, invert) {
    switch (color) {
        case "red":
            if (invert) {
                // if invert add upside down knight
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/red-knight-l-inv.webp)";
            } else {
                // else add normal knight
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/red-knight-l.webp)";
            }
            break;
        default:
            // if not blue - its red
            if (invert) {
                // if invert add upside down knight
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/blue-knight-l-inv.webp)";
            } else {
                // else add normal knight
                chessSquare.style.backgroundImage = "url(./assets/images/knights-set" + imageSet + "/blue-knight-l.webp)";
            }
            break;
    }
}

/**
 * calculates possible squares we can move to from currentSquare
 */
function getPossibleToMoveTo() {
    // clear everything from last move
    clearOldPossibleMoves();
    // get col and row from currentSquare.id
    let col = parseInt(currentSquare.id.split("-")[0]);
    let row = parseInt(currentSquare.id.split("-")[1]);
    // possible plaves we can move to
    // col - 1, row - 2,
    // col - 1, row + 2,
    // col - 2, row - 1,
    // col - 2, row + 1,
    // col + 1, row - 2,
    // col + 1, row + 2,
    // col + 2, row - 1,
    // col + 2, row + 1,
    let moves = [-1, -2, -1, 2, -2, -1, -2, 1, 1, -2, 1, 2, 2, -1, 2, 1];
    // for each pssible move - stepping by 2
    for (let m = 0; m < moves.length; m += 2) {
        // moves[m] as col addition
        let c = moves[m];
        // moves[m + 1] as row addition
        let r = moves[m + 1];
        // get coord from values above
        let coord = (col + c) + "-" + (row + r);
        // if its in the allSquares map that we created in createBoard()
        if (allSquares[coord]) {
            if (!isVisited(allSquares[coord])) {
                // if its not already been visited add it to possible moves
                possibleToMoveTo.push(allSquares[coord]);
            }
        }
    }
    // we have our possible moves - set them to the hint colour
    for (var i = 0; i < possibleToMoveTo.length; i++)
        possibleToMoveTo[i].style.backgroundColor = hintColor;

    // if we have no possible moves the game is over
    if (possibleToMoveTo.length === 0) {
        gameOver();
    }
}

/**
 *  has this chessSquare been visited
 * @param {*} chessSquare 
 * @returns 
 */
function isVisited(chessSquare) {
    // if this element has class of "knight" we have already been there
    if (chessSquare.classList.contains("knight")) {
        return true;
    }
    return false;
}

/**
 * clear possibleToMoveTo[] and reset square colours from hint colour
 */
function clearOldPossibleMoves() {
    for (var i = 0; i < possibleToMoveTo.length; i++) {
        // if its not been visited
        if (!isVisited(possibleToMoveTo[i])) {
            // set it back to dark or light colour
            setSquareColor(possibleToMoveTo[i]);
        }
    }
    // empty array for next move
    possibleToMoveTo = [];
}

/**
 * game is over - there are no more possible moves
 */
function gameOver() {
    // write heading for Game over section (#infosection)
    writeInfoSectionHeading("Game Over");
    // create string to display moves
    let moves = "";
    for (var i = 0; i < moveHistory.length; i++) {
        // append chessSquare id from histor to string
        moves += moveHistory[i].id + ",";
    }
    // replace trailing comma with full stop
    moves = moves.substring(0, moves.length - 1) + ".";
    // if moves used = boardSize squared - we hit every square - announce result to player in #info1
    if (moveHistory.length == Math.pow(boardSize, 2)) {
        document.getElementById("info1").textContent = "You completed a Knight's Tour of " + boardSize + " by " + boardSize + ".";
    } else {
        // we didnt hit every square - invert the last knight on the board - the blue one
        addKnightToSquare(currentSquare, "blue", true);
        // announce result to player in #info1
        document.getElementById("info1").textContent = "There are no more moves available. You made " + moveHistory.length + " moves out of a possible " + (Math.pow(boardSize, 2)) + ".";
    }
    // display historic moves to player in #info2 and #info3
    document.getElementById("info2").textContent = "Your moves were:";
    document.getElementById("info3").textContent = moves;
}

/**
 * read setup-input element and restart game with new boardsize
 */
function getSizeAndGo() {
    // set the new boardSize to the value in "setup-input"
    let newBoardSize = parseInt(document.getElementById("setup-input").value);
    // if entered value not a number
    if (isNaN(newBoardSize)) {
        alert("Please enter a number greater than " + (minBoardSize - 1) + " and less than " + (maxBoardSize + 1) + ".");
        document.getElementById("setup-input").value = "";
    } else {
        // restart game
        // clear the old board
        chessBoard.innerHTML = "";
        // set new board size from input value
        boardSize = newBoardSize;
        // limit to maxBoardSize
        if (boardSize > maxBoardSize) {
            boardSize = maxBoardSize;
        }
        // limit to minBoardSize
        if (boardSize < minBoardSize) {
            boardSize = minBoardSize;
        }
        // but boardsize into "setup-input" window
        document.getElementById("setup-input").value = boardSize;
        // reset moveHistory, allSquares
        moveHistory = [];
        allSquares = {};
        possibleToMoveTo = [];
        // create new game
        createBoard();
    }
}

// add eventlistener "click" to setup-button to act on it being clicked
document.getElementById("setup-button").addEventListener("click", function (event) {
    getSizeAndGo();
});
// add eventlistener "keydown" to setup-input filed to act on it being changed
document.getElementById("setup-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        getSizeAndGo();
});