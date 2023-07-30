//Letter guess list
const guessedLetters = document.querySelector(".guessed-letters");
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

//Word to be guessed
const word = "magnolia";

const blurWord = function(){
    const placeholderLetters = [];
    for(let letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
blurWord();

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const letter = letterInput.value;
    console.log(letter);
    letterInput.value = "";
});