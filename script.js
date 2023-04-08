import { updateBird, setupBird, isInFrame, getBirdRect } from "./bird.js"
import { updatePipes, setupPipes, removePipes, getPassedPipesCount, getPipeRects } from "./pipe.js"

document.addEventListener("keypress", handleStart, { once: true })
const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")

let lastTime

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function checkLose() {
  const birdRect = getBirdRect()
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
  if(isInFrame() == false || insidePipe) {
    return true
  } 
  return false
}

function updateLoop(time) {
  if(lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  updateBird(delta)
  updatePipes(delta)
  if(checkLose()) {
    return handleLose()
  }
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function handleStart() {
  title.classList.add("hidden")
  setupBird()
  setupPipes()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hidden")
    subtitle.classList.remove("hidden")
    subtitle.innerText = getPassedPipesCount() + " pipes"
    removePipes()
    setupBird()
    document.addEventListener("keypress", handleStart, { once: true })
  }, 160)
}