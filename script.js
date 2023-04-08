let pipe = Pipe
let bird = Bird

document.addEventListener("keypress", handleStart, { once: true })
const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")

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
  bird.setupBird()
  pipe.setupPipes()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hidden")
    subtitle.classList.remove("hidden")
    //subtitle.innerText = pipe.getPassedPipesCount() + " pipes"
    pipe.removePipes()
    bird.setupBird()
    document.addEventListener("keypress", handleStart, { once: true })
  }, 170)
}