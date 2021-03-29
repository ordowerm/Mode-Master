/*
This script controls the page animations.

It contains functions for:
-updating the background color of each page
-animating the selection/deselection of paths on the SVG

*/



//function setting colors of background and top module
function SetModeColor(id){
  $("body").css("background-color",SecondaryColors[id]);
  $("#mode-module").css("background-color",PrimaryColors[id]);
}

//
function SetChordColor(id){
  $("#chord-module").css("background-color",PrimaryColors[id]);
}
