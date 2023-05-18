let pipe = Pipe
let bird = Bird

let bestScore = 0

let startButton = document.getElementById("start")

startButton.addEventListener("click", handleStart, { once: true })
const title = document.getElementById("title")
const currentScoreLabel = document.getElementById("current-score")
const bestScoreLabel = document.getElementById("best-score")
const score = document.getElementById("score")

let lastTime

const hitAudio = new Audio("sound_effects/hit.mp3")
const dieAudio = new Audio("sound_effects/die.mp3")
  
function areCollided(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function birdAndPipeCollided() {
  let collided = pipe.getPipeRects().some(rect => areCollided(bird.getBirdRect(), rect))
  if(collided == true) {
    hitAudio.play()
  }
  return collided
}

function isGameOver() {
  if(bird.isInFrame() == false) {
    dieAudio.play()
    return true
  } else if(birdAndPipeCollided() == true) {
    hitAudio.play()
    return true
  } else {
    return false
  }
}

function updateLoop(time) {
  if(lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  bird.updateBird(delta)
  pipe.updatePipes(delta)
  if(isGameOver()) {
    return handleLose()
  }
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function handleStart() {
  title.classList.add("hidden")
  score.classList.remove("hidden")
  bird.setupBird()
  pipe.setupPipes()
  score.innerText = "Score: " + pipe.getPassedPipesCount()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    score.classList.add("hidden")
    title.classList.remove("hidden")
    currentScoreLabel.classList.remove("hidden")
    bestScoreLabel.classList.remove("hidden")
    currentScoreLabel.innerText = "Your score: " + pipe.getPassedPipesCount()
    if(pipe.getPassedPipesCount() >= bestScore) {
      bestScore = pipe.getPassedPipesCount()
    }
    bestScoreLabel.innerText = "Your best score: " + bestScore
    pipe.removePipes()
    bird.setupBird()
    startButton.addEventListener("click", handleStart, { once: true })
  }, 170)
}