// GLOBAL VARIABLES
// ==================================================

// Array of word options
var bands = ["bangles", "pat benatar", "bon jovi", "david bowie", "chicago", "phil collins", "culture club", "duran duran", "eurythmics", "fleetwood mac", "foreigner", "genesis", "heart", "whitney houston", "billy idol", "janet jackson", "michael jackson", "billy joel", "elton john", "journey", "cyndi lauper", "kenny loggins", "madonna", "richard marx", "george michael", "motley crue", "pet shop boys", "poison", "prince", "reo speedwagon", "lionel richie", "rod stewart", "styx", "tina turner", "thompson twins", "van halen", "wham"];

var selectedWord; // Stores random-selected word
var numBlanks; // # of blanks based in "selectedWord"
var letterGuessed; // Stores the letter guessed
var lettersInWord = []; // Stores the individual letters of each word
var blanksAndSuccesses = []; // Stores mix of blanks & solved letters
var wrongGuesses = []; // Stores wrong guesses

// Game counters
var winCounter = 0;
var lossCounter = 0;
var guessesLeft = 15;

// Get Elements
var wordHolder = document.getElementById("wordToGuess");
var showGuessesLeft = document.getElementById("guesses-left");
var wrong = document.getElementById("wrong-guesses");
var win = document.getElementById("win-counter");
var loss = document.getElementById("loss-counter");
var getHint = document.getElementById("hint");
var showClue = document.getElementById("clue");

// FUNCTIONS
// =======================================================

// play() will start and restart game
function play() {

  // Reset Variables
  guessesLeft = 15;
  blanksAndSuccesses = [];
  wrongGuesses = [];
  showClue.innerHTML = "";

  // Solution chosen randomly from bands array
  selectedWord = bands[Math.floor(Math.random() * bands.length)];

  // Breaks solution word into individual letters
  lettersInWord = selectedWord.split("");

  // Counts the number of letters in the word
  numBlanks = lettersInWord.length;

  // Print solution in console (for testing)
  // console.log(selectedWord);

  // Fill "blanksAndSuccesses" list with appropriate number of blanks, based on number of letters in solution word
  for (var i = 0; i < numBlanks; i++) {
    if (lettersInWord[i] === " ") {
      blanksAndSuccesses.push("&nbsp;");
    } else {
      blanksAndSuccesses.push("_");
    }
  }

  // Print initial blanks in console
  console.log(blanksAndSuccesses);

  // Reset all HTML variables
  showGuessesLeft.innerHTML = guessesLeft;
  wordHolder.innerHTML = blanksAndSuccesses.join(" ");
  wrong.innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function - holds all comparisons for matches
function checkLetters(letter) {

  // Boolean will be toggled based on if user's letter is found anywhere in the word
  var letterInWord = false;

  // Checks if letter exists inside the array at all
  for (var i = 0; i < numBlanks; i++) {

    if (selectedWord[i] === letter) {

      // If letter exists, then toggle boolean to true, used in next step
      letterInWord = true;
    }
  }

  // If letter exists somewhere in word, figure out exactly where (which indices)
  if (letterInWord) {

    // Loop through the word
    for (var i = 0; i < numBlanks; i++) {

      // Populate blanksAndSuccesses with every instance of the letter
      if (selectedWord[i] === letter) {

        // Set specific blank space(s) to equal correct letter when there is a match
        blanksAndSuccesses[i] = letter;
      }
    }

    // Log current blanks and successes for testing
    console.log(blanksAndSuccesses);
  }

  // If letter doesn't exist at all...
  else {

    // Add letter to list of wrong letters
    wrongGuesses.push(letter);

    // Also subtract one of the guesses
    guessesLeft--;

  }
}

// hint() will give hint when button is clicked
hint.onclick = function () {

  hints = ["Manic Monday", "Love is a Battlefield", "Wanted: Dead or Alive", "Let's Dance", "You're the Inspiration", "Sussudio", "Karma Chameleon", "Hungry Like the Wolf", "Here Comes the Rain Again", "Go Your Own Way", "Juke Box Hero", "Invisible Touch", "These Dreams", "Greatest Love of All", "Rebel Yell", "The Pleasure Principle", "Thriller", "A Matter of Trust", "Bennie And The Jets", "Don't Stop Believin'", "Girls Just Wanna Have Fun", "Footloose", "Into the Groove", "Hold On to the Nights", "Faith", "Home Sweet Home", "West End Girls", "Every Rose Has Its Thorn", "Purple Rain", "Take It On the Run", "All Night Long \(All Night\)", "Forever Young", "Mr. Roboto", "Private Dancer", "Hold Me Now", "Jump", "Careless Whisper"];

  var hintIndex = bands.indexOf(selectedWord);
  showClue.innerHTML = "Song: " + hints[hintIndex];
};

// roundComplete() function - will run necessary code after each guess is made
function roundComplete() {

  // Log initial status in console re: how many wins, losses, and guesses are left
  console.log("Guesses Remaining: " + guessesLeft);

  // HTML UPDATES
  // ============

  // Update HTML to reflect new number of guesses
  showGuessesLeft.innerHTML = guessesLeft;

  // Print array of guesses and blanks onto page
  wordHolder.innerHTML = blanksAndSuccesses.join(" ");

  // Print wrong guesses to page
  wrong.innerHTML = wrongGuesses.join(" ");

  // If word guess string equals solution
  
  if (!blanksAndSuccesses.includes("_")) {

    winCounter++; // Add to the win correctGuesses
    alert("You Win!"); // Give user "win" alert   

    // Update win correctGuesses in HTML
    win.innerHTML = "Wins: " + winCounter;

    // Restart game
    play();
  }

  // if user has run out of guesses
  else if (guessesLeft === 0) {

    lossCounter++; // Add to loss correctGuesses
    alert("You Lose!"); // Give user "lose" alert    

    // Update loss correctGuesses in HTML
    loss.innerHTML = "Losses: " + lossCounter;

    // Restart game
    play();

  }

}

// MAIN PROCESS
// =======================================================

// Starts game
play();

// Then initiates function for capturing key clicks
document.onkeyup = function (event) {

  // captures keypress, eliminating repeat letters
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuessed = event.key;

    if (wrongGuesses.indexOf(letterGuessed) !== -1) {
      alert("You already guessed that letter.");
      return;
    }

    // Runs code to check for correct guesses
    checkLetters(letterGuessed);

    // Runs code that ends each round
    roundComplete();

  }

};