let chessboard = document.getElementById('chessboard');
let possibleToMoveTo = [];
let movesUsed = 0;
let currentSquare;
let height = 8;
let width = 8;
let lightColor = "#00000";
let darkColor = "#00ffff";
let hintColor = "#c0c0c0";
let debug = false;

function createBoard() {
    console.log("\tcreateBoard() start");
    console.log("screen width = " + window.innerWidth);
    console.log("screen height = " + window.innerHeight);
    console.log("height = " + height);
    console.log("width = " + width);
    console.log("lightColor = " + lightColor);
    console.log("darkColor = " + darkColor);
    console.log("hintColor = " + hintColor);
    console.log("chessboard.style.width = " + chessboard.style.width);
    console.log("chessboard.style.height = " + chessboard.style.height);
    console.log("window.innerWidth-10 = " + (window.innerWidth - 10));
    console.log("(window.innerWidth-10)/width = " + (window.innerWidth - 10) / width);
    console.log("Math.floor (window.innerWidth-10)/width = " + Math.floor((window.innerWidth - 10) / width));
    let sqWidth = Math.floor((window.innerWidth - 10) / width);
    console.log("window.innerWidth = " + window.innerHeight)
  
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        let chessSquare = document.createElement('div');
        chessSquare.className = 'square';
        chessSquare.style.width = (sqWidth - 2) + "px";
        console.log("width = " + chessSquare.style.width);
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
    document.addEventListener("click", function listenAllSquares(event) {
      currentSquare = document.getElementById(event.target.id);
      if (possibleToMoveTo.includes(event.target.id) || movesUsed === 0) {
        setCurrentPosition();
      }
    });
    console.log("\tcreateBoard() end");
  }
  