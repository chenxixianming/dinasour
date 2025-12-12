const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
const gameOver = document.getElementById('gameOver');

let isJumping = false;
let isGameOver = false;
let score = 0;
let cactusPosition = 600;
let dinoBottom = 0;
let gravity = 0.4;
let jumpVelocity = 0;
let gameSpeed = 3;
const minSpeed = 3;
const maxSpeed = 10;

function jump() {
    if (isJumping || isGameOver) return;
    
    isJumping = true;
    jumpVelocity = 12;
}

function startGame() {
    isGameOver = false;
    score = 0;
    cactusPosition = 600;
    dinoBottom = 0;
    gameSpeed = minSpeed;
    scoreDisplay.textContent = score;
    gameOver.classList.remove('show');
    dino.style.bottom = '0px';
    cactus.style.right = '-20px';
    gameLoop();
}

function endGame() {
    isGameOver = true;
    gameOver.classList.add('show');
}

function checkCollision() {
    const dinoLeft = 50;
    const dinoRight = dinoLeft + 40;
    const dinoBottomPos = dinoBottom;
    
    const cactusLeft = 600 - cactusPosition;
    const cactusRight = cactusLeft + 20;
    const cactusTop = 40;
    
    if (
        dinoRight > cactusLeft &&
        dinoLeft < cactusRight &&
        dinoBottomPos < cactusTop
    ) {
        return true;
    }
    return false;
}

function gameLoop() {
    if (isGameOver) return;
    
    // Handle jumping physics
    if (isJumping || dinoBottom > 0) {
        dinoBottom += jumpVelocity;
        jumpVelocity -= gravity;
        
        if (dinoBottom <= 0) {
            dinoBottom = 0;
            isJumping = false;
            jumpVelocity = 0;
        }
    }
    dino.style.bottom = dinoBottom + 'px';
    
    // Move cactus
    cactusPosition += gameSpeed;
    if (cactusPosition > 620) {
        cactusPosition = 0;
        score++;
        scoreDisplay.textContent = score;
        
        // Gradually increase speed with upper limit
        if (score % 3 === 0 && gameSpeed < maxSpeed) {
            gameSpeed += 0.2;
        }
    }
    cactus.style.right = cactusPosition + 'px';
    
    // Check collision
    if (checkCollision()) {
        endGame();
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (isGameOver) {
            startGame();
        } else {
            jump();
        }
    }
});

document.addEventListener('click', () => {
    if (isGameOver) {
        startGame();
    } else {
        jump();
    }
});

startGame();
