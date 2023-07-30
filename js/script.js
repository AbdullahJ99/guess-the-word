//Letter guess list
const guessedList = document.querySelector(".guessed-letters");
//Guess! button
const guessButton = document.querySelector(".guess");
//Letter guessing input
const letterInput = document.querySelector(".letter");
//Word in progress paragraph
const wordInProgress = document.querySelector(".word-in-progress");
//Remaining guesses paragraph
const guessesRemaining = document.querySelector(".remaining");
//Guess message paragraph
const guessMessage = document.querySelector(".message");
//Play Again! button
const playAgain = document.querySelector(".play-again");

//Variables
const word = "magnolia";
const guessedLetters = [];

//Blurring the word
const blurWord = function(){
    const placeholderLetters = [];
    for(let letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
blurWord();

//Pressing the Guess! button
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    guessMessage.innerText = "";
    const letter = letterInput.value;
    const validLetter = validate(letter);
    if (validLetter !== undefined){
        makeGuess(validLetter);
        console.log(validLetter);
    }
    letterInput.value = "";
});

//Input validation
const validate = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (letterInput.value === ""){
        guessMessage.innerText = "Type your guess in the text box!";
    } else if (letterInput.value.length > 1){
        guessMessage.innerText = "Your guess cannot be more than one letter.";
    } else if (!letterInput.value.match(acceptedLetter)){
        guessMessage.innerText = "Your guess must be a letter from A-Z.";
    } else {
        return input;
    }
}

//Guess making function
const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)){
        guessMessage.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
}