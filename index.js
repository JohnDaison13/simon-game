var gamePattern=[]
var startFlag=1
var randomNumber
var buttonColors=["green","red","yellow","blue"]
var randomColor
var userPattern=[]
var userColor
var level=0
var currentLevel=0

var greenAudio=new Audio("./sounds/green.mp3")
var blueAudio=new Audio("./sounds/blue.mp3")
var redAudio=new Audio("./sounds/red.mp3")
var yellowAudio=new Audio("./sounds/yellow.mp3")
var wrongAudio=new Audio("./sounds/wrong.mp3")

$("html").on("keypress",function()
{
    if(startFlag)
    {
        nextSequence()
        startFlag=0
    }
})

$(".btn").on("click",function()
{
    if(startFlag===0)
    {
        userColor=this.classList[1]
        userPattern.push(userColor)
        playSound(userColor)
        animatePress(userColor)
        if(!checkAnswer(currentLevel))
        {
            wrongAudio.play()
            
            $("body").addClass("game-over");
            setTimeout(function()
            {
                $("body").removeClass("game-over");
            },100)
            
            $("h1").text("Game over, press any key to Restart")
            startOver()
        }
        currentLevel++
        if (currentLevel===level)
            setTimeout(nextSequence,1000)
    }
})


function nextSequence()
{   
    userPattern=[]
    currentLevel=0
    $("h1").text("Level "+level)
    randomNumber=Math.floor(Math.random()*4)
    randomColor=buttonColors[randomNumber]
    gamePattern.push(randomColor)

    $("."+randomColor).fadeOut(100).fadeIn(100)
    playSound(randomColor)
    level++
}

function playSound(theColor)
{
    switch(theColor)
    {
        case "blue":
            blueAudio.play()
            break;
        case "red":
            redAudio.play()
            break;
        case "green":
            greenAudio.play()
            break;
        case "yellow":
            yellowAudio.play()
            break;
        default:
            alert("Something wrong")
    }
}

function animatePress(theColor)
{
    $("."+theColor).addClass("pressed");
    setTimeout(function()
    {
        $("."+theColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel)
{
    if(userPattern[currentLevel]!==gamePattern[currentLevel])
    {
        return 0
    }
    return 1
}

function startOver()
{
    level=0
    gamePattern=[]
    startFlag=1
}