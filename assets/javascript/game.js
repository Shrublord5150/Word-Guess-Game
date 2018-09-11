// Variables

// The Chosen song
var chosenSong; 

// THe Underscore
var underscore = [];

// The User's correct guesses
var correctGuesses = [];

// THe User's incorrect guesses
var incorrectGuesses = [];

// The number of attempts the User can make before losing the game
var remainingAttempts = 12;

// The Alphabet Array * a .split simply turns the letters into an Array *
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Create a function that generates a random song
GetRandomSong = function () {

    // Create an array of the terrible Nickleback songs
    var songs = ['photograph', 'rockstar', 'hero', "how you remind me", 'someday', "far away", 'lullaby', "if everyone cared", "what are you waiting for", "trying not to love you"];
    
    // Select a song randomly from the 'songs' array
    chosenSong = songs[Math.floor(Math.random() * songs.length)];
    console.log(chosenSong);
};

// Create a function to populate the underscore array *must hold letters, underscores, and SPACES*
UpdateUnderscore = function () {

    // added reset of the underscore Array
    underscore = [];

    // Create a loop to cycle through ALL song title characters
    for (i = 0; i < chosenSong.length; i++) {

        // Store the individual character temporarily
        var character = chosenSong[i].charAt();

        // if user guesses correctly
        if (correctGuesses.indexOf(character) > -1) {

        // Push that character to the Array
        underscore.push(character.toUpperCase());
        }

        // If the User has NOT guessed yet
        else {

            // If the character is not a SPACE...
            if (character !== ' ') {

                // Push an underscore
                underscore.push('_');
            }

            // If the character is a space...
            else{
                // push a space
                underscore.push(' ');
            }
        }
    }

    // Draw the underscore to the DOM
    DrawUnderscore();

};

// Create a function that will draw the underscores onto the DOM
DrawUnderscore = function () {

    // Create a temporary variable 
    var t = '';

    // loop through the underscore
    for (var i = 0; i < underscore.length; i++) {

        // Push the character to the temp variable
        t += underscore[i].toUpperCase();

        // Push a SPACE so that the output will be legible
        t += '&nbsp;' 

        // If the character is a SPACE... 
        if (underscore[i] === ' ') {

            // push another SPACE to distinguish word separation
            t += '&nbsp;';

        }
    }

    // Draw the underscores to the DOM
    document.getElementById("song").innerHTML = t;
    // console.log(t);
};



// Create a function that updates the underscore and checks for a win condition
DrawCorrect = function () {

    // Update the underscore
    UpdateUnderscore();

     // If the underscore no longer contains an underscore, the user must have won
     if (underscore.indexOf('_') === -1) {

        // Wait 1/10 of a second so the DOM updates
        setTimeout(function () {

            // Tell the user they won
            alert('YOU WIN!!! You must be a huge Nickleback fan!!! Chad Kroeger would be proud!');

            // Once the alert is closed, this function will be called automatically and reset the game
            Reset();

        }, 100);
    }
}

// This function is automatically triggered once the DOM has loaded
window.onload = function () {

    // Grab a random song
    GetRandomSong();

    // Update the underscore
    UpdateUnderscore();

    // Update the image
    // DrawImage();
    // Console.log(DrawImage("photograph"));
   

};

// Create a function that places incorrect choices on the DOM
DrawIncorrect = function () {

    // Create a temp variable
    var t = '';

    // Sort the incorrect guesses alphabetically
    incorrectGuesses = incorrectGuesses.sort();

    // Loop through the incorrect guesses
    for (var i = 0; i < incorrectGuesses.length; i++) {

        // Push the character to the temp variable
        t += incorrectGuesses[i];

        // Add a space so it's legible
        t += '&nbsp;'

    }

    // Draw it to the DOM
    document.getElementById("incorrect").innerHTML = t;

    // Let the user know how many guesses they have left
    document.getElementById("remaining").innerHTML = remainingAttempts.toString();

    // If the user no longer has any attempts left, they lost
    if (remainingAttempts === 0) {

        // Wait 1/10 of a second so the DOM updates
        setTimeout(function () {

            // Tell them they lost
            alert('Game over! The song was ' + chosenSong + '. What are you a Creed fan?! Nickleback would be ashamed!');

            // Reset the game
            Reset();
        }, 100);
    }

};

// Create a function that populates the image that cooralates to the chosen song
// DrawImage = function () {

//     // Create a variable to hold the image
//     var imageHolder = document.getElementById("image-holder");

//     // Link the chosen song with the cooralating image
//     if (chosenSong === 'photograph') {

//         document.createElement("IMG");
//     imageHolder.setAttribute("src", "assets/images/Nickelback-photograph.jpg");
//     imageHolder.setAttribute("width", "304");
//     imageHolder.setAttribute("height", "228");
//     imageHolder.setAttribute("alt", "Photograph");

//     };

// };



// Create a function that resets the game on win or lose
Reset = function () {

    // Reset the variables the game uses
    underscore = [];
    correctGuesses = [];
    incorrectGuesses = [];
    remainingAttempts = 12;

    // Clear the DOM
    document.getElementById("incorrect").innerHTML = '';
    document.getElementById("correct").innerHTML = '';

    // Get a random song
    // TODO => You should probably make sure it's not the same song they have already played with...
    GetRandomSong();

    // Update the underscore
    UpdateUnderscore();
};

// Controls and Directions------------------------------------------------------

// Add an event listener to wait for the Users key press
document.addEventListener('keypress', (event) => {

    // Create a User Guess variable as the event key
    var userGuess = event.key.toLowerCase();

    // Create a variable that holds the Start Directions
    var directionsText = document.getElementById("directions-text");

    // Set a Start "keybind" (based on directions) that when pressed...
    if (userGuess === "/") {

        // Hides the start directions...
        directionsText.textContent = "";
    }

    // Create a direction alert that informs the User how to play ()
    if (alphabet.indexOf(userGuess) === -1) {

        // This alert will prompt again if the User presses any key not in the alphabet array
        alert('Please choose a letter from A - Z to fill in the unknown Nickleback song title. Have fun!');
        return;
    }

    // Create condition that prevents user from guessing the same letter twice (whether correct or incorrect)
    if (correctGuesses.indexOf(userGuess) > -1 || incorrectGuesses.indexOf(userGuess) > -1) {

        // This alert will prompt anytime the condition is met
        alert('You already tried letter ' + userGuess.toUpperCase() + '.');
        return;
    }

    // If the User guesses a correct letter
    if (chosenSong.indexOf(userGuess) > -1) {

        // Push the letter to the correctGuesses array
        correctGuesses.push(userGuess);

        // Update the underscore
        DrawCorrect();

    }

    // If the User guesses an incorrect letter
    else {

        // Push the letter to the incorrectGuesses array
        incorrectGuesses.push(userGuess);

        // Update the incorrect guesses on the DOM
        DrawIncorrect();

        // and minus 1 attempt from the remaining attempts
        remainingAttempts--;
    }

});