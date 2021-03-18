/*
This script programmatically builds the mode wheel
*/

//constructor containing mode drawing parameters
//for now, I'm hardcoding these values. If I need different sizes, add arguments to constructor
function DrawData(){
  this.classname="mode-section";
  this.divnumber = 7; //number of modes
  this.width=100.0;
  this.height=100.0;

  //radii of different elements of SVG
  this.inradius=0.65; //radius of inner circle
  this.outradius_near = 0.67; //inner-lip of outer section
  this.outradius_far = 0.87; //outer-lip of outer section
  this.textradius = 0.76; //radius of arc around which mode names should be drawn
  this.stepradius = 0.96; //radius where the WWHWWWH is written
  this.chordradius = 0.45; //radius of arc along which to write the seventh chord
}

/*
Builds an inner section of the SVG. It does not rotate it.
Input id attribute and color attributes, + DrawData object.
*/
function DrawInnerPath(id,color,data){
    //begin writing path. Move drawing cursor to bottom-left corner of SVG canvas
    var returnme = "<path class=\""+data.classname+"\" id=\""+id+"\" fill=\""+color+"\" d=\"M 0 ";
    returnme += data.height.toString() + " ";

    //draw segment denoting start point of inner arc
    var val1 = data.width/2.0*data.inradius;
    returnme += "l " + val1.toString() + " 0";

    var angle = (2*Math.PI)/data.divnumber;
    console.log(angle.toString());
    val1 = data.width/2.0*data.inradius*Math.cos(angle);
    var val2 = data.height-data.width/2.0*data.inradius*Math.sin(angle);
    returnme += "A " + data.width/2.0*data.inradius.toString() + " " + data.width/2.0*data.inradius + " 0 0 0" + val1.toString() + " " + val2.toString();

    returnme += " Z\" />\"";
    return returnme;
}

/*
Builds an outer section of the SVG.
*/
function DrawOuterPath(id,color,data){
  var returnme = "<path class=\""+data.classname+"\" id=\""+id+"\" fill=\""+color+"\" d=\"M ";
  var val1 = data.width/2.0*data.outradius_near;
  returnme += val1.toString() + " " + data.height.toString() + " ";
  var angle = (2*Math.PI)/data.divnumber;
  val1 = data.width/2.0*data.outradius_near*Math.cos(angle);
  var val2 = data.height-data.width/2.0*data.outradius_near*Math.sin(angle);
  returnme += "A " + data.width/2.0*data.outradius_near.toString() + " " + data.width/2.0*data.outradius_near.toString() + " 0 0 0" + val1.toString() + " " + val2.toString();
  val1 = data.width/2.0*data.outradius_far*Math.cos(angle);
  val2 = data.height-data.width/2.0*data.outradius_far*Math.sin(angle);
  returnme += "L "+val1.toString()+" "+val2.toString();
  val1 = data.width/2.0*data.outradius_far;
  returnme += "A " + data.width/2.0*data.outradius_far.toString() + " " + data.width/2.0*data.outradius_far.toString() + " 0 0 1" + val1.toString() + " "+data.height ;
  returnme += " Z\" />\"";
  //returnme+=MakeTextPath(id,"Hey, Bob","smalltextclass");

  return returnme;

}

/*
Makes a textpath to accompany mode paths

format for path id attribute:
mode + '-textpath'

format for text id attribute:
mode + '-wheel-text'
*/
function DrawModeTextPath(id,text,data){
  var newid = id+"-textpath";
  var path = "<path class=\""+data.classname+"\" id=\""+newid+"\" stroke=\"none\" fill=\"none\" d=\"M ";

  //move to starting point of arc
  var angle = (2*Math.PI)/data.divnumber;
  var val1 = data.width/2.0*data.textradius*Math.cos(angle);
  var val2 = data.height-data.width/2.0*data.textradius*Math.sin(angle);
  path += val1.toString() + " " + val2.toString() + " ";

  val1 = data.width/2.0*data.textradius;

  path += "A " + data.width/2.0*data.textradius.toString() + " " + data.width/2.0*data.textradius.toString() + " 0 0 1" + val1.toString() + " " + data.height + " \" />";
  var textpath= "<text class=\"modetext\"  id=\""+id +"-wheel-text\" ><textPath href=\"#"+newid+"\" text-anchor=\"middle\" startOffset=\"50%\">"+text.toUpperCase()+"</textPath></text>";
  return path+textpath;
}

/*
Makes a text path for writing the 7th chord along the arc

format for ID attribute of textpath:
'chord-textpath-'+number

format for ID attributes of text on text:
'chord-text-'+number

tag for roman numeral:
'roman-'+number

class for other textpath:
'chordtext-wheel'
*/
function DrawChordTextPathOld(num,data){
  var pathid = "chord-textpath-"+num.toString();
  var path = "<path id=\"chord-textpath-"+num.toString()+"\" stroke=\"none\" fill=\"none\" "; //begin textpath
  //move to starting point of arc
  var angle = (2*Math.PI)/data.divnumber;
  var val1; //= data.width/2.0*data.textradius*Math.cos(angle);
  var val2; //= data.height-data.width/2.0*data.textradius*Math.sin(angle);

  //use alternate arcs depending on which chord section is being drawn.
  //basically, I don't want the chord names to appear upside-down, since they include numbers
  if (num > 1 && num <6) {
    val1 = data.width/2.0*data.chordradius;
    val2 = data.height;
    path += "d =\"M "+val1.toString() + " " + val2.toString() + " ";
    val1 = data.width/2.0*data.chordradius*Math.cos(angle);
    val2 = data.height-data.width/2.0*data.chordradius*Math.sin(angle);
    path += "A " + data.width/2.0*data.chordradius.toString() + " " + data.width/2.0*data.chordradius.toString() + " 0 0 0" + val1.toString() + " " + val2.toString() + " \" />";
    var textpath= "<text class=\"modetext\"  id=\""+"TEST VALUE" +"-wheel-text\" ><textPath href=\"#"+pathid+"\" text-anchor=\"middle\" startOffset=\"50%\">"+"IMaj7"+"</textPath></text>";
    return path+textpath;
  }
  else {
    val1 = data.width/2.0*data.chordradius*Math.cos(angle);
    val2 = data.height-data.width/2.0*data.chordradius*Math.sin(angle);
    path += "d =\"M "+val1.toString() + " " + val2.toString() + " ";
    val1 = data.width/2.0*data.chordradius;
    path += "A " + data.width/2.0*data.chordradius.toString() + " " + data.width/2.0*data.chordradius.toString() + " 0 0 1" + val1.toString() + " " + data.height + " \" />";
    var textpath= "<text class=\"modetext\"  id=\""+"TEST VALUE" +"-wheel-text\" ><textPath href=\"#"+pathid+"\" text-anchor=\"middle\" startOffset=\"50%\">"+"IMaj7"+"</textPath></text>";
    return path+textpath;
  }

}


/*
Function for drawing the boxes containing each chord and roman numeral.


format for ID attribute of roman numeral box:
'roman-text-'+number;

format for ID attribute of whole textbox:
'chord-text'+number
*/
function DrawChordTextPath(data){
  var text="";
  var n = data.divnumber;
  var angle = 2.0*Math.PI/n;
  var r = data.chordradius*data.width/2.0;
  var i;
  for(i=0;i<n;i++){
    text+="<text class=\"chordtext\" id=\"chord-text-"+i.toString()+"\" ";
    text+="x=\""+(data.width/2.0-r*Math.cos(7.0*angle/4.0+angle*(i))).toString()+"\" ";
    text+="y=\""+(data.height/2.0-r*Math.sin(7.0*angle/4.0+angle*(i))).toString()+"\" >";
    text+=GetRoman(0,i)+SeventhChords[i]+"</text>";
  }
  return text;
}


/*
Draws intervals
*/

function DrawIntervals(data){
  var n = data.divnumber;
  var angle = 2.0*Math.PI/n;
  var r = data.stepradius*data.width/2.0;
  var text = "";
  var i = 0;
  for(i=0;i<n;i++){
    text+="<text class=\"intervaltext\" ";
    text+="x=\""+(data.width/2.0-r*Math.cos(angle/4.0+angle*(i+2))).toString()+"\" ";
    text+="y=\""+(data.height/2.0-r*Math.sin(angle/4.0+angle*(i+2))).toString()+"\" ";
    text+=">"+Step[i]+"</text>";
  }
  return text;
}


/*
creates a group for each set of paths, then transforms them appropriately.
*/
function MakeGroup(data, num, groupname,color){
  var n = data.divnumber;
  var offset = 360/(2.0*n);//(Math.PI/2.0-Math.PI/n)*360/(2*Math.PI); //offset angle to center transformation group

  var groupstring = "<g id=\""+groupname+"\" "; //begin group tag
  var transformstring = "transform = \""
  transformstring +="translate("+(data.width/2.0).toString()+","+(-data.height/2.0).toString()+") ";
  transformstring+= "rotate("+((offset-90.0)+num*offset*2.0).toString()+" "+"0" + " "+(data.height).toString()+")"; //translate group to center
  transformstring+="\" ";
  groupstring+=transformstring;
  groupstring+=">"; //close tag

  //add paths to group
  var paths = DrawInnerPath(groupname+"-inner-path",color,data);
  paths += DrawOuterPath(groupname+"-outer-path",color,data);
  paths += DrawModeTextPath(groupname,Mode[num],data);
  groupstring+=paths;

  //closing tag
  groupstring += "</g>";

  return groupstring;
}

/*
function that adds SVG to the div corresponding to the id in the function's argument
*/
function AddPaths(id){
  var i;
  var data = new DrawData();
  var addstring = "";
  for (i=0;i<data.divnumber;i++){
    addstring+=MakeGroup(data,i,Mode[i]+"-group",PrimaryColors[i]);
  }
  addstring+=DrawIntervals(data);
  addstring +=DrawChordTextPath(data);

  document.getElementById(id).innerHTML=addstring;
}
