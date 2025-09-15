const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');

let birdY = 250;
let velocity = 0;
const gravity = 0.5;
const flapStrength = -8;

let pipes = [];
let pipeInterval;
let gameLoop;
let gameRunning = true;

function flap() {
  velocity = flapStrength;
}

function createPipe() {
  const pipeGap = 150;
  const pipeWidth = 60;
  const pipeTopHeight = Math.floor(Math.random() * 300) + 50;
  const pipeBottomHeight = 600 - pipeTopHeight - pipeGap;

  const topPipe = document.createElement('div');
  topPipe.classList.add('pipe', 'pipe-top');
  topPipe.style.height = `${pipeTopHeight}px`;
  topPipe.style.left = '400px';

  const bottomPipe = document.createElement('div');
  bottomPipe.classList.add('pipe', 'pipe-bottom');
  bottomPipe.style.height = `${pipeBottomHeight}px`;
  bottomPipe.style.left = '400px';

  gameContainer.appendChild(topPipe);
  gameContainer.appendChild(bottomPipe);

  pipes.push({ top: topPipe, bottom: bottomPipe, x: 400 });
}

function updatePipes() {
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;
    pipes[i].top.style.left = pipes[i].x + 'px';
    pipes[i].bottom.style.left = pipes[i].x + 'px';

    // Collision detection
    if (
      pipes[i].x < 140 &&
      pipes[i].x + 60 > 100 &&
      (birdY < parseInt(pipes[i].top.style.height) ||
        birdY + 40 > 600 - parseInt(pipes[i].bottom.style.height))
    ) {
      endGame();
    }

    // Remove pipes off screen
    if (pipes[i].x < -60) {
      gameContainer.removeChild(pipes[i].top);
      gameContainer.removeChild(pipes[i].bottom);
      pipes.splice(i, 1);
      i--;
    }
  }
}

function update() {
  velocity += gravity;
  birdY += velocity;
  if (birdY < 0) birdY = 0;
  if (birdY > 560) {
    endGame();
  }
  bird.style.top = birdY + 'px';
  updatePipes();
}

function startGame() {
  pipeInterval = setInterval(createPipe, 2000);
  gameLoop = setInterval(update, 20);
}

function endGame() {
  clearInterval(pipeInterval);
  clearInterval(gameLoop);
  gameRunning = false;
  alert('💀 Game Over!');
  location.reload(); // reload page to restart
}

// Controls
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    flap();
  }
});

document.addEventListener('click', flap);

startGame();
