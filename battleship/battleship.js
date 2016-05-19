//Space undefined if empty
var NOTHING = undefined;

//Space is 0 if there is a ship placed there
var SHIP = 0;

//Changes space value to 1 when hit
var HIT = 1;

//Changes space value to -1 when miss
var MISS = -1;

//Empty game board array
var board = [[],[],[],[],[],[],[],[],[],[]];

//Torpedos left
var torpedosLeft = 1;

//When number of hits = 5, you win
var numberOfHits = 0;

//Creates idString global variable
var idString;
//Create a global variable for 1st board index
// var row ;
//Create a variable for 2nd board index
// var column;
//Create a variable for ships placed
var shipsPlaced = 0;

// Create a function that places 5 ships randomly
// function placeShip(length) {
//     //do/while loop that chooses random coordinates for rows & columns
//     column = Math.floor(Math.random() * (length+1));
//     row = Math.floor(Math.random() * 10);
//     do {
//       if(board[row][column] != SHIP){
//         board[row][column] = SHIP;
//         column++;
//         shipsPlaced++;
//       }
//     } while(shipsPlaced < length)
//     shipsPlaced = 0;
// }// end of placeShip function

function placeShip(length) {
  //do/while loop that chooses random coordinates for rows & columns
  var column = Math.floor(Math.random() * (length + 1));
  var row = Math.floor(Math.random() * 10);
  //Starts a while loop that loops as long as shipsPlaced is less than length
  while(shipsPlaced < length){
    // if statement that places a ship if there is no ship
    if(board[row][column] != SHIP && checkEmptyShipSpace(row,column) === true){
      //place a ship in an empty space
      board[row][column] = SHIP;
      //increase column count by 1
      column++;
      //increase shipsPlaced by 1
      shipsPlaced++;
    }
    else{
      //otherwise generate a new number for column and row
      column = Math.floor(Math.random() * (length + 1));
      row = Math.floor(Math.random() * 10);
      //place a ship in the new column and row
      board[row][column] = SHIP;
      //increase column by 1
      column++;
      // increase shipsPlaced by 1
      shipsPlaced++;
    }
  };
  shipsPlaced = 0; // reset ships placed to 0
} // end of placeShip function

function checkEmptyShipSpace(row, column){
  //Top
  if(board[row-1][column] != SHIP){
    return false;
  }

  //Bottom
  if(board[row+1][column] != SHIP){
    return false;
  }

  //Left
  if(board[row][column-1] != SHIP){
    return false;
  }

  //Right
  if(board[row][column +1] != SHIP){
    return false;
  }
  return true;
}


function setAllShips(){
  placeShip(4);
  placeShip(4);
  placeShip(4);
  placeShip(4);

}


//Create a function that reveals ships upon losing
function revealShips() {
  // for loop that checks if ships were in a space and changes color
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if(board[row][column] === SHIP){
        var r = row.toString();
        var c = column.toString();
        $("#" + r + c).addClass("reveal");
      };
    }
  };

}// close reveal ships function


//Function used to check if the space is a hit or miss
function shootTorpedo(){
  if(board[row][column] === NOTHING && torpedosLeft > 0){
    board[row][column] = MISS;
    $("#" + idString).addClass("miss");
    torpedosLeft = torpedosLeft - 1;
    $("#numberTorpedos").text("Torpedos Remaining: " + torpedosLeft);
  }
  if(board[row][column] === SHIP && torpedosLeft > 0) {
    board[row][column] = HIT;
    $("#" + idString).addClass("hit");
    numberOfHits = numberOfHits + 1;
    torpedosLeft = torpedosLeft - 1;
    $("#numberTorpedos").text("Torpedos Remaining: " + torpedosLeft);
  }
  if(numberOfHits === 5){
    $("#winOutput").text("YOU SUNK MY BATTLESHIP!!");
  }
  if(torpedosLeft === 0) {
    $("#winOutput").text("YOU LOSE, McLOSER-FACE!");

    revealShips();
  }

}

$(document).ready(function() {
  //Creates a 10x10 table and assigns an id to them
  for (var i = 0; i < 10; i++) {
    var newTableRow = $("tbody").append("<tr></tr>");
    for (var j = 0; j < 10; j++) {
      newTableRow.append('<td id="' + i + j + '">' + i + j + '</td>');
    }
  };
  //Generate Ships

  // on click, changes color to indicate a miss
  $("td").on("click", function(){
      //Makes the ID of the td into a string
      idString = $(this).attr("id");
      //Assigns variable x to the first integer of id
      row = parseInt(idString.charAt(0));
      //Assigns variable y to the second integer of id
      column = parseInt(idString.charAt(1));


      //Calls the shootTorpedo function
      shootTorpedo()
    }//End of on click function
  );//End of on click
setAllShips();



});//End of .ready
