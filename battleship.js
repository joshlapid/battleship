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
var torpedosLeft = 5;

//When number of hits = 5, you win
var numberOfHits = 0;

//Creates idString global variable
var idString;
//Create a global variable for 1st board index
var row ;
//Create a variable for 2nd board index
var column;
//Create a variable for ships placed
var shipsPlaced = 0;


function placeShip() {

    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
      board[row][column] = SHIP;
      shipsPlaced++
    }
    while(board[row][column] === SHIP && shipsPlaced < 5)
}


function revealShips() {
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      if(board[row][column] === SHIP){
        var r = row.toString();
        var c = column.toString();
        $("#" + r + c).addClass("reveal");
      };
    }
  };

}


//Function used to check if the space is a hit or miss
function shootTorpedo(){
  if(board[row][column] === NOTHING && torpedosLeft > 0){
    board[row][column] = MISS;
    $("#" + idString).addClass("miss");
    torpedosLeft = torpedosLeft - 1;
    $("#numberTorpedos").text("Torpedos Remaining: " + torpedosLeft);
  }
  if(board[row][column] === SHIP) {
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
  placeShip();


});//End of .ready
