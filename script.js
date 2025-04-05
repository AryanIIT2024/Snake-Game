let inputDir = { x: 0, y: 0 };
let FoodSound = new Audio("food.mp3");
let GameOverSound = new Audio("gameover.mp3");
let MoveSound = new Audio("move.mp3");
let MusicSound = new Audio("music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [{ x: 12, y: 15 }];
let food = { x: 6, y: 7 };

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Colliding with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Colliding with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        GameOverSound.play();
        MusicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If snake eats food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        FoodSound.play();
        score++;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HighScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Render
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? "head" : "snake");
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// High score initialization
let hiscore = localStorage.getItem("highScore");
let hiscoreval;
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "HighScore: " + hiscoreval;
}

// Start game
window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    MoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (inputDir.y !== -1) inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (inputDir.x !== 1) inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (inputDir.x !== -1) inputDir = { x: 1, y: 0 };
            break;
    }
});
