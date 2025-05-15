var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Check if device is mobile
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Update the title text based on device
$(document).ready(function() {
  if (isMobile) {
    $("#level-title").text("Tap the Button to Start");
  }
});

// // Handle keyboard start for desktop
// $(document).keydown(function() {
//   if (!started) {
//     startGame();
//   }
// });
function startGame() {
  $("#level-title").text("Level " + level);
  $("#start-button").hide(); // Hide the button after game starts
  nextSequence();
  started = true;
}


// Handle button tap for mobile
$("#start-button").click(function() {
  if (!started) {
    startGame();
  }
});

// Common function to start the game
function startGame() {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      
      // Update game over message based on device
   if (isMobile) {
  $("#level-title").text("Game Over, Tap Button to Restart");
} else {
  $("#level-title").text("Game Over, Click Button to Restart");
}
$("#start-button").show(); // Show the button again to restart


      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
