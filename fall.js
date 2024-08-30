const gameContainer = document.querySelector('.game-container');
const basket = document.getElementById('basket');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startButton = document.getElementById('start-button');

let score = 0;
let lives = 3;
let gameInterval;
let fallingObjects = [];
 

function startGame() {
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    fallingObjects = [];

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(createFallingObject, 1000);

    startButton.style.display = 'none';
}

function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
    gameContainer.appendChild(object);
    fallingObjects.push(object);

    animateFallingObject(object);
}

function animateFallingObject(object) {
    let top = 0;
    const fallingInterval = setInterval(() => {
        top += 5;
        object.style.top = `${top}px`;

        if (checkCollision(object)) {
            clearInterval(fallingInterval);
            object.remove();
            score ++;
            updateScore();
        } else if (top > gameContainer.clientHeight - 30) {
            clearInterval(fallingInterval);
            object.remove();
            lives -= 1;
            updateLives();

            if (lives === 0) {
                endGame();
            }
        }
    }, 50);
}

function checkCollision(object) {
    const basketRect = basket.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return !(basketRect.right < objectRect.left || 
             basketRect.left > objectRect.right || 
             basketRect.bottom < objectRect.top || 
             basketRect.top > objectRect.bottom);
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateLives() {
    livesElement.textContent = lives;
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
    startButton.style.display = 'block';
}


basket.addEventListener("mousedown", onMouseDown);

basket.addEventListener("mouseup", onMouseDown);

function onMouseDown()

{

document.addEventListener("mousemove", onMouseMove); }

function onMouseMove (event)

{

basket.style.left = (event.clientX+20) + "px"; 

}
startButton.addEventListener('click', startGame);

