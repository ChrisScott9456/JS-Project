//Puzzle array to keep track of the location of each tile
var puzzle = [
["t1", "t2", "t3", "t4"],
["t5", "t6", "t7", "t8"],
["t9", "t10", "t11", "t12"],
["t13", "t14", "t15", "t16"],[]];

var emptyI = 3; //Location of empty tile
var emptyJ = 3; //Location of empty tile
var currI = 0; //Location of current tile
var currJ = 0; //Location of current tile

function shuffle() {
  checkAdjacent();
  var bool = true;
  var counter = 0;

  while(bool) {
    var temp = Math.floor(Math.random() * 16) + 1;
    if(document.getElementById("t" + temp).getAttribute("onclick") != "") {
      counter++;
      moveTile("t" + temp);

      if(counter == 100) {
        bool = false;
      }
    }
  }
}

//Finds the currently searched tile's location in the 'puzzle' array
function findTile(tileID) {
  for(i = 0; i < 5; i++) {
    for(j = 0; j < 5; j++) {
      if(puzzle[i][j] == tileID) { //Search for desired tile
        if(tileID == "t16"){
          emptyI = i; //Save location of empty tile
          emptyJ = j; //Save location of empty tile
        }else {
          currI = i; //Save location of searched tile
          currJ = j; //Save location of searched tile
        }
      }
    }
  }
}

//Keeps track of which tiles can be moved
function checkAdjacent() {
  //Find location of empty tile
  findTile("t16");

  //Check tile above empty tile
  if(emptyI-1 != -1 && puzzle[emptyI-1][emptyJ] != null) {
    document.getElementById(puzzle[emptyI-1][emptyJ]).classList.add('movable');
    document.getElementById(puzzle[emptyI-1][emptyJ]).setAttribute("onclick", "moveTile(\'" + puzzle[emptyI-1][emptyJ] + "\')");
  }

  //Check tile below empty tile
  if(emptyI+1 != -1 && puzzle[emptyI+1][emptyJ] != null) {
    document.getElementById(puzzle[emptyI+1][emptyJ]).classList.add('movable');
    document.getElementById(puzzle[emptyI+1][emptyJ]).setAttribute("onclick", "moveTile(\'" + puzzle[emptyI+1][emptyJ] + "\')");
  }

  //Check tile to left of empty tile
  if(emptyJ-1 != -1 && puzzle[emptyI][emptyJ-1] != null) {
    document.getElementById(puzzle[emptyI][emptyJ-1]).classList.add('movable');
    document.getElementById(puzzle[emptyI][emptyJ-1]).setAttribute("onclick", "moveTile(\'" + puzzle[emptyI][emptyJ-1] + "\')");
  }

  //Check tile to right of empty tile
  if(emptyJ+1 != -1 && puzzle[emptyI][emptyJ+1] != null) {
    document.getElementById(puzzle[emptyI][emptyJ+1]).classList.add('movable');
    document.getElementById(puzzle[emptyI][emptyJ+1]).setAttribute("onclick", "moveTile(\'" + puzzle[emptyI][emptyJ+1] + "\')");
  }
}

//Swaps the location of the clicked tile with the empty tile
function moveTile(tileID) {
  findTile(tileID); //Find location of current tile

  //Swap elements in the puzzle array
  var temp = puzzle[currI][currJ];
  puzzle[currI][currJ] = puzzle[emptyI][emptyJ];
  puzzle[emptyI][emptyJ] = temp;

  //Swap tiles in the actual HTML page
  document.getElementById("t16").id = "temp";
  document.getElementById(tileID).id = "t16";
  document.getElementById("temp").id = tileID;

  //Reset adjacent tiles
  for(i = 1; i <= 16; i++) {
    document.getElementById("t" + i).classList.remove('movable');
    document.getElementById("t" + i).setAttribute("onclick", "");
  }
  checkAdjacent();
  checkWin();
}

//Check if the current board is complete
function checkWin() {
  var counter = 1;

  for(i = 0; i < 4; i++) {
    for(j = 0; j < 4; j++){
      if(puzzle[i][j] != ("t" + counter)) {
        return false;
      }
      counter++;
    }
  }
  //Display win message
  document.getElementById("win").style.visibility = "visible";
}
