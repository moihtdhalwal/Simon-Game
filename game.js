var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var toggle = false;

$(document).keypress(function(event){
    if(toggle==false)
    {
      toggle = true;
      $("#level-title").text("Level "+level);
      nextSequence();
    }
    }
);


  $(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

  });

function nextSequence() {
userClickedPattern = [];

  level++;

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);


}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    if(userClickedPattern.length == gamePattern.length){
    setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    setTimeout(function(){$('body').removeClass('game-over');
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    },200);
    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  toggle = false;
}
