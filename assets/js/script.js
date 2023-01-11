var chessboard = document.getElementById('chessboard');
let everySquareEventListenerRemoved=false;
let possibleToMoveTo = [];
createBoard();

function createBoard() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var chessSquare = document.createElement('div');
        chessSquare.className = 'chess-square';
  
        chessSquare.id = getSquareId(i, j);
        chessSquare.dataset.visited = 0;
  
        // for debugging only
        chessSquare.textContent = chessSquare.id;
  
        chessSquare.addEventListener("click", function listenAllSquares() {
          console.log("clicked square " + this.id+ " "+everySquareEventListenerRemoved);
          if(!everySquareEventListenerRemoved){
            console.log("removing listeners from all squares");
            // remove listeners from squares - wont be listening for start position anymore
            let squares = document.getElementsByClassName('chess-square');
            console.log("squares " + squares.length);
            for (let i = 0; i < squares.length; i++) {
              squares[i].removeEventListener("click", listenAllSquares);
              everySquareEventListenerRemoved=true;
            }
          }
        //   setCurrentPosition(this.id);
        });
  
        chessboard.appendChild(chessSquare);
        setSquareColor(chessSquare.id);
      }
    }
  }

  function getSquareId(n1, n2) {
    let sqId = "" + (n1 + 1) + (n2 + 1);
    return sqId;
  }
  
  function setSquareColor(id) {
    let n1 = parseInt(id[0]);
    let n2 = parseInt(id[1]);
    if ((n1 + n2) % 2 == 0) {
      getSquareById(id).classList.add("whiteBackground");
    } else {
      getSquareById(id).classList.add("cyanBackground");
    }
  }
  
  function getSquareById(id) {
    let sq = document.getElementById(id);
    return sq;
  }
  