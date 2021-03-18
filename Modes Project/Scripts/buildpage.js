//These should hold the arrays of elements used for assigning click listeners
var InnerIds;
var OuterIds;
var OuterTextPaths; //since text paths interrupt the click listener for the paths, we assign the same click listeners to each text path
var InnerTextPaths;

//Variables keeping track of which modes/chords are currently selected
var chordSelected = 0;
var modeSelected = 0;

//input mode number, update text boxes in mode module
function SetModeText(){
  document.getElementById("modename").innerHTML=Mode[modeSelected]; //update mode name in top module
  document.getElementById("tagline").innerHTML=Taglines[modeSelected]; //update tagline
  var i;
  for (i=0;i<7;i++){
    var tag = "note-number-"+(i+1).toString();
    var notename = GetAccidental(modeSelected,i)+(i+1).toString();
    document.getElementById(tag).innerHTML=notename;
  } //iterate through notes

  //This loop updates chord wheel text, unclicks modes
  for (i=0; i<7;i++){
    document.getElementById(Mode[i]+"-group-outer-path").setAttribute("class","div-unselected");
    document.getElementById("chord-text-"+i.toString()).innerHTML= GetAccidental(modeSelected,(7+i-modeSelected)%7)+GetRoman(modeSelected,i)+SeventhChords[i];
  }

  document.getElementById(Mode[modeSelected]+"-group-outer-path").setAttribute("class","div-selected");



};

//click listener takes an event as a parameter.
function SelectMode(event){
  if (event.data.param == modeSelected) {return;} //if no change required exit function
  modeSelected = event.data.param;
  SetModeText(); //update text boxes
  //update background colors
  SetModeColor(modeSelected);
}

//adds click listener to each mode group
function AddModeListeners(){
  var i;
  for (i=0;i<7;i++){
    var number = i;

    //add click listener to mode path
    var id ="#"+Mode[number]+"-group-outer-path";
    $(id).click({
      param: number
    },SelectMode);

    //add click listener to text inside of each mode div
    id = "#"+Mode[number]+"-group-wheel-text";
    $(id).click({
      param: number
    },SelectMode);
  }

}


$(document).ready(function(){

  AddPaths("wheel");
  SetModeText();
  SetModeColor(0);
  SetChordColor(1);
  AddModeListeners();
});
