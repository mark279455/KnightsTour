let chessboard = document.getElementById('chessboard');
let possibleToMoveTo = [];
let movesUsed = 0;
let currentSquare;
let height = 8;
let width = 8;
const globalDebugLevel = 1;
// let lightColor = "#00ffff";
// let darkColor =  "#ee31db";
// let hintColor = "#fefa67";
let lightColor = "#ffffff";
let darkColor = "#00ffff";
let hintColor = "#c0c0c0";
let debug = true;
createBoard();

/**
 * draw chessboard on screen according to colors and values of height and width
 * also resizes according to viewport size
 */
function createBoard() {
    debugMessage(1, "\tcreateBoard() start", true);
    debugMessage(1, "screen width = " + window.innerWidth);
    debugMessage(1, "screen height = " + window.innerHeight);
    debugMessage(1, "height = " + height);
    debugMessage(1, "width = " + width);
    debugMessage(1, "lightColor = " + lightColor);
    debugMessage(1, "darkColor = " + darkColor);
    debugMessage(1, "hintColor = " + hintColor);
    debugMessage(1, "chessboard.style.width = " + chessboard.style.width);
    debugMessage(1, "chessboard.style.height = " + chessboard.style.height);
    debugMessage(1, "window.innerWidth-10 = " + (window.innerWidth - 10));
    debugMessage(1, "(window.innerWidth-10)/width = " + (window.innerWidth - 10) / width);
    debugMessage(1, "Math.floor (window.innerWidth-10)/width = " + Math.floor((window.innerWidth - 10) / width));
    let sqWidth = Math.floor((window.innerWidth - 10) / width);
    debugMessage(1, "window.innerWidth = " + window.innerHeight)

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            let chessSquare = document.createElement('div');
            chessSquare.className = 'square';
            chessSquare.style.width = (sqWidth - 2) + "px";
            debugMessage(2, "chessSquare width = " + chessSquare.style.width);
            chessSquare.style.height = (sqWidth - 2) + "px";
            chessSquare.id = getSquareId(i, j);
            chessSquare.dataset.visited = 0;

            // for debugging only
            if (debug) {
                chessSquare.style.fontSize = "0.6rem";
                chessSquare.textContent = chessSquare.id;
            }
            chessboard.appendChild(chessSquare);
            setSquareColor(chessSquare);
        }
    }
    debugMessage(1, "\tcreateBoard() end");
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