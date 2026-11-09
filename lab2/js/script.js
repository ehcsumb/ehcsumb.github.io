// alert("running external");

// let myLuckyNumber = 4;

// document.querySelector("h1").style.color = "red";

//Global variables
let randomNumber;
let attempts = 0;
let MAX_ATTEMPTS = 7;
let totalWins = 0;
let totalLosses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
   // show the guess button
   document.querySelector("#guessBtn").style.display = "inline";
   // init playerGuess input
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";
   // init previous guesses and feedback 
   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";
   let prevGuesses = document.querySelector("#guesses");
   prevGuesses.textContent = "";
   // init remaining attempts
   let remaining = document.querySelector("#remainingCount");
   remaining.textContent = MAX_ATTEMPTS - attempts;
}

function checkGuess() {
    // clear feedback
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    // evaluate guess
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    // if guess is out of bounds
    if(guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    } 
    // increment attemps
    attempts++;
    console.log(`Attempts: ${attempts}`);
    document.querySelector("#remainingCount").textContent = MAX_ATTEMPTS - attempts;
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it!  You Won!";
        feedback.style.color = "lightgreen";
        totalWins++;
        refreshTotals();
        gameOver();
    } else {
        // add guess to previous guesses
        let guessElement = document.createElement("div");
        guessElement.className = "prevGuess";
        guessElement.textContent = guess;
        document.querySelector("#guesses").appendChild(guessElement);
        // document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == MAX_ATTEMPTS) {
            feedback.textContent = "Sorry, you lost.  The number was: " + randomNumber;
            feedback.style.color = "red";
            totalLosses++;
            gameOver();
            refreshTotals();
        } else if ( guess > randomNumber ) {
            feedback.textContent = "Guess was high";
            guessElement.classList.add("high");
        } else {
            feedback.textContent = "Guess was low";
            guessElement.classList.add("low");
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display= "inline";
}

function refreshTotals() {
    let totalWinsElm = document.querySelector("#totalWins");
    let totalLossesElm = document.querySelector("#totalLosses");
    totalWinsElm.textContent = totalWins;
    totalLossesElm.textContent = totalLosses;
}

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);