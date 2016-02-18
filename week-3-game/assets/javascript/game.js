// CREATING VARIABLES FOR THE GAME
var word = ["bodybuilding","Math","Javascript","Blue","Rutgers","Volkswagen"];
// ACCESSES THE WORDS IN THE ARRAY
var word = word[Math.floor(Math.random() * word.length)];
// CONVERTS ALL WORDS IN THE WORD ARRAY TO UPPER CASE 
	word = word.toUpperCase();
// EMPTY VARIABLE FOR STORING RANDOM PASSWORD WORD
var password = ""; 
// CHECKS THE LENGTH OF THE PASSWORD
var length = word.length;
// NUMBER OF INCORRECT GUESSES
var guesses = 0;
// FOR LOOP IS CREATED: IF INDEX IS LESS THAN LENGTH ADD ONE TO INDEX,
// CHARAT METHOD RETURNS CHARACTER AT SPECIFIED INDEX IN A STRING
for ( i = 0; i< length; i++) {
	if (word.charAt(i) == " ") password = password + " ";
	else password = password + "-";
}
//AUDIO FILES FOR CORRECT LETTER AND WRONG LETTER
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
// FUNCTION FOR GENERATING WORD
function generateWord() {
	document.getElementById("board").innerHTML = password;
}
// FUNCTION FOR WHEN THE PAGE WINDOW IS LOADED
window.onload = start;

//  ARRAY IS CREATED WITH AVAILALBLE LETTERS THAT WILL DISPLAY ON THE SCREEN,
// USER WILL USE THEM TO GUESS THE LETTER
var letters =  new Array(26);
letters[0] = "A";
letters[1] = "B";
letters[2] = "C";
letters[3] = "D";
letters[4] = "E";
letters[5] = "F";
letters[6] = "G";
letters[7] = "H";
letters[8] = "I";
letters[9] = "J";
letters[10] = "K";
letters[11] = "L";
letters[12] = "M";
letters[13] = "N";
letters[14] = "O";
letters[15] = "P";
letters[16] = "Q";
letters[17] = "R";
letters[18] = "S";
letters[19] = "T";
letters[20] = "U";
letters[21] = "V";
letters[22] = "W";
letters[23] = "X";
letters[24] = "Y";
letters[25] = "Z";
// FUNCTION START IS BEING CALLED, IT CREATES A DIV VARIABLE THEN FOR LOOP RUNS IT 25 TIMES ADDS ONE EACH TIME(LETTERS)
// VAR ELEMENT WITH "LET" VALUE IS CREATED, DIV IS CALLED AND NEW VALUE IS ASSIGNED TO IT
// IF STATEMENT IS CREATED THAT RETURNS THE DIVISON REMINDER WHICH CREATES 7 ROWS OF LETTERS AND CSS IS ADDED TO CLEAR ITS FLOATS
// LASTLY THE DOCUMNET IS BEING SAVED BY GRABBING THE ID ALPHABET AND INSERTED INTO INNER HTML
function start(){
	var div = "";
	for ( i = 0; i < 25; i++) {
		var element = "let" + i;
		div = div + '<div class = "letter" onclick = "check('+i+')" id="'+element+'">'+letters[i]+'</div>';
		if ((i + 1) % 7 == 0) div = div + '<div style = "clear:both;"></div>';
	}
	document.getElementById("alphabet").innerHTML = div;
	generateWord();
}
// STRING.PROTOTYPE ALLOWS YOU TO ADD NEW PROPORTIES AND METHODS TO EXISTING OBJECTS
String.prototype.setLetter = function(place, sign){
	if ( place > this.length -1) return this.toString();
	else return this.substr (0, place) + sign + this.substr(place + 1);
};
// THIS FUNCTION IS CHECKING IF CORRECT LETTER WAS PRESSED IF YES IT WILL INSERT IT INTO CORRECT SPOT WITHIN THE WORD THAT WE ARE GUESSING
function check(num) {
	var correct = false;
	for ( i = 0; i < length; i++) {
		if ( word.charAt(i) == letters[num]) {
			password = password.setLetter(i,letters[num]);
			correct = true;
		}
	}
// IF THE CORRECT LETTER WAS PRESSED IT WILL DO THIS AND STYLE WITH THE FOLLOWING CSS PROPERTIES AND GENERATE ANOTHER WORD
	if ( correct == true) {
		yes.play();
		var element = "let" + num;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = " 3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
// IF THE WORD HAS BEEN GUESSED IT WILL GENERATE ANOTHER WORD 
		generateWord();
	}
//  IF THE WRONG LETTER WAS PRESSED IT WILL APPLY THE FOLLOWING CSS PROPERTIES
	else {
		no.play();
		var element = "let" + num;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = " 3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onClick",";");
// HERE THE IMAGE IS BEING INSERTED TO THE INNER HTML
	guesses++;
	var image = "assets/images/s" + guesses + ".jpg";
	document.getElementById("hangman").innerHTML = '<img src ="'+image+'"alt=""/>';
	}
	// IF WINNER IT WILL DISPLAY THIS MESSAGE BY TAKING ITS ID AND INSERTING INTO INNER HTML
	if (word == password)
	document.getElementById("alphabet").innerHTML = "Thats Correct, Congratulations! The word is:" +word+'<br/><br/><span class="reset" onClick="location.reload()">Play Again?</span>';

	// IF MORE THAN 9 GUESSES, LOOSER IT WILL DISPLAY THIS MESSAGE BY TAKING ITS ID AND INSERTING INTO INNER HTML
	if (guesses >= 9)
	document.getElementById("alphabet").innerHTML = "Game Over!<br/> The word was:" +word+'<br/><br/><span class="reset" onClick="location.reload()">Play Again?</span>';

}
