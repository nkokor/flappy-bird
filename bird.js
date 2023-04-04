const bird = document.querySelector("[data-bird]")

const BIRD_SPEED = 0.15 
const JUMP_DURATION = 130
let timeSinceLastJump = Number.POSITIVE_INFINITY

function setTop(top) {
  bird.style.setProperty("--bird-top", top)
}

function getTop() {
  let top = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"))
  return top
}

function handleJump(event) {
  if(event.code == "Space") {
    timeSinceLastJump = 0
  } else {
    return
  }
}

export function updateBird(delta) {
  if(timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta)
  } else {
    setTop(getTop() + BIRD_SPEED * delta)
  }
  timeSinceLastJump = timeSinceLastJump + delta
}

export function setupBird() {
  setTop(280)
  document.removeEventListener("keydown", handleJump)
  document.addEventListener("keydown", handleJump)
}

export function isInFrame() {
  if(getTop() >= 10 && getTop() + 195 <= 700) {
    return true
  } return false
}