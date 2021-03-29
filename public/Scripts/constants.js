/*
This module stores object information and declares global constants and variables.



A decidedly non-OOP approach to storing this data.
Since each mode has a unique mode number, it suffices to store the parameters in an array, like so.

*/
const Mode = [
   "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian"
]; //mode names
const Sharpset = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A#",
  "B"
]; //note names -- might be used for future versions of app
const Flatset = [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "G♭",
  "G",
  "A♭",
  "A",
  "B♭",
  "B"
]; //note names -- might be used for future versions of app
const PrimaryColors = [
  "#9CADFF",
  "#F0AEFF",
  "#FFEB87",
  "#FFBC91",
  "#AEFFB3",
  "#FFA198",
  "#CCCCCC"
]; //light colors to use for each mode
const SecondaryColors = [
  "#606B9C",
  "#946B9C",
  "#D1A900",
  "#C7743E",
  "#539657",
  "#B44D43",
  "#696969"
]; //dark colors to use for each mode
const SeventhChords = [
  "Maj7",
  "min7",
  "min7",
  "Maj7",
  "7",
  "min7",
  "ø7"
]; //7th chords constructed at the 1st scale degree of each mode
const Step = "WWHWWWH"; //used to populate interval wheel
const Roman = [
  "i","ii","iii","iv","v","vi","vii"
]; //roman numerals for displaying the appropriate scale degree for the root of each chord
const Tensions =[["9","11","13"],["9","11","13"],["♭9","11","♭13"],["9","♯11","13"],["9","11","13"],["9","11","♭13"],["♭9","11","♭13"]]; //accidentals corresponding to each tension
const Taglines = [
  "\"The Major Scale\"",
  "\"Minor, Natural 6\"",
  "\"Minor, ♭9\"",
  "\"Major, ♯11\"",
  "\"Major, ♭7\"",
  "\"The Minor Scale\"",
  "\"The Garbage Scale\""
]; //Descriptions of each mode

/*
Global-scoped variables containing the ID suffixes of each SVG path.
Initialize as an array of strings when building the SVG.
Add click listeners once the SVG is constructed by iterating through the resulting arrays.
*/
const Innertag = "-path-inner";
const Outertag = "-path-outer";
const Modetag = "-mode-text";
const Chordtag = "-chord-text";
