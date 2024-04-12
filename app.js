const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startStopBtn = document.querySelector(".startStop");
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let playGame = false;
let countDownTimerId;
startStopBtn.addEventListener("click", () => {
    if (!playGame) {
        randomSquare()
        squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                if (square.id === hitPosition) {
                    result++;
                    score.textContent = result;
                    hitPosition = null;
                }
            });
        });
        moveEmoji();
        countDownTimerId = setInterval(countDown, 1000);
        playGame = true;
        startStopBtn.innerHTML = "Stop Game"
    } else {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        squares.forEach((square) => {
            square.classList.remove("emoji");
        });
        playGame = false;
        timeLeft.innerHTML = 60;
        score.innerHTML = "0";
        startStopBtn.innerHTML = "Play Game"
    }

})

function randomSquare() {
    squares.forEach((square) => {
        square.classList.remove("emoji");
    });

    let randomSqaure = squares[Math.floor(Math.random() * 12) + 1];
    randomSqaure.classList.add("emoji");
    hitPosition = randomSqaure.id;
}



function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}



function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert(`Game Over! Your final Score Is ${result}`);
    }
}