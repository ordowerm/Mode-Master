/*
This module is used for building strings, given the mode number and scale degree.
*/

//returns character corresponding to accidental
function GetAccidental(root,offset){
  let num = (offset)%7; //scale degree, relative to current mode
  let accidental = ""; //return string containing accidental, or empty if the scale degree is natural
  switch(root){
    case 0: //ionian
      break;
    case 1: //dorian
      if (num==2||num==6){
        accidental="♭";
      }
      break;
    case 2: //phrygian
      if (num==2||num==6||num==5||num==1){
        accidental="♭";
      }
      break;
    case 3: //lydian
      if (num == 3){
        accidental = "♯";
      }
      break;
    case 4: //mixolydian
      if (num == 6){
        accidental="♭";
      }
      break;
    case 5: //aeolian
      if (num==2||num==6||num==5){
        accidental="♭";
      }
      break;
    case 6: //locrian
      if (num != 0 && num !=3){
        accidental="♭";
      }
      break;
    default:
      console.log("Error when retrieving accidental.");
      break;
  }
  return accidental;
}

//makes the roman numeral corresponding to the scale degree upper or lower-case depending on chord scale
function GetRoman(root,offset){
  let num = (7+offset-root)%7; //scale degree, relative to current mode
  let roman = Roman[num];

  //check tonality
  let chordId = (offset)%7;
  //if ionian, lydian, or mixolydian, make upper-case
  if (chordId == 0 || chordId == 3 || chordId ==4){
    return roman.toUpperCase();
  }
  return roman;
}
