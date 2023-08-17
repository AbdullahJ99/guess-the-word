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
//Remaining guesses span
const guessesRemainingSpan = document.querySelector(".remaining span");
//Guess message paragraph
const guessMessage = document.querySelector(".message");
//Play Again! button
const playAgain = document.querySelector(".play-again");

//Global Variables
let word = "";
let guessedLetters = [];
let remainingGuesses = 8;
const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    word = randomWord.trim();
    blurWord(word);
}

getWord();

//Blurring the word
const blurWord = function(word){
    const placeholderLetters = [];
    for(let letter of word){
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//Pressing the Guess! button
guessButton.addEventListener("click", function(e){
    e.preventDefault();
    guessMessage.innerText = "";
    const letter = letterInput.value;
    const validLetter = validate(letter);
    if (validLetter !== undefined){
        makeGuess(validLetter);
    }
    letterInput.value = "";
});

//Input validation
const validate = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length == ""){
        guessMessage.innerText = "Type your guess in the text box!";
    } else if (input.length > 1){
        guessMessage.innerText = "Your guess cannot be more than one letter.";
    } else if (!input.match(acceptedLetter)){
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
        updateLetters();
        guessesLeft(letter);
        updateWord(guessedLetters);

    }
}

//Update guessed letters list
const updateLetters = function(){
    guessedList.innerHTML = "";
    for (const letter of guessedLetters){
        let li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
}

//Update the blurred word in progress
const updateWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const blurredWord = [];
    for (const letter of wordArray){
        if(guessedLetters.includes(letter)){
            blurredWord.push(letter.toUpperCase());
        } else {
            blurredWord.push("●");
        }
    } 
    wordInProgress.innerText = blurredWord.join("");
    success();
}

//Counts remaining guesses
const guessesLeft = function(guess){
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)){
        guessMessage.innerText = `You got it! ${guess} is part of the word!`;
    } else {
        guessMessage.innerText = `Sorry, ${guess} is not in the word.`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0){
        guessMessage.innerText = `GAME OVER. The word was ${word}.`;
        startOver();
    } else if (remainingGuesses === 1){
        guessesRemainingSpan.innerText = "1 guess";
    } else {
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
}

//Check win condition
const success = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        guessMessage.classList.add("win");
        guessMessage.innerHTML = '<p class="highlight">You guessed the word correctly! Congrats!</p>';
        startOver();
    }
}

const startOver = function(){
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedList.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function(){
    guessMessage.classList.remove("win");
    guessMessage.innerText = "";
    guessedList.innerText = "";
    guessedLetters = [];
    remainingGuesses = 8;
    guessesRemainingSpan.innerText = "8 guesses";
    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedList.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});
