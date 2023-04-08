const bird = document.getElementById("bird")

const GRAVITY = 0.13 
const BIRD_SPEED = 0.22
const JUMP_DURATION = 130

let timeSinceLastJump = Number.POSITIVE_INFINITY

function handleJump(event) {
  if(event.code == "Space") {
    timeSinceLastJump = 0
  } else {
    return
  }
}

function flyUp(delta) {
  let birdBottom = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-bottom"))
  birdBottom = birdBottom + BIRD_SPEED * delta
  bird.style.setProperty("--bird-bottom", birdBottom)
}

function dropDown(delta) {
  let birdBottom = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-bottom"))
  birdBottom = birdBottom - GRAVITY * delta
  bird.style.setProperty("--bird-bottom", birdBottom)
}

export function updateBird(delta) {
  if(timeSinceLastJump < JUMP_DURATION) {
    flyUp(delta)
  } else {
    dropDown(delta)
  }
  timeSinceLastJump = timeSinceLastJump + delta
}

export function getBirdBottom() {
  return parseFloat(getComputedStyle(bird).getPropertyValue('--bird-bottom'))
}

export function setupBird() {
  let birdBottom = 380
  bird.style.setProperty("--bird-bottom", birdBottom)

  document.removeEventListener("keydown", handleJump)
  document.addEventListener("keydown", handleJump)
}

export function isInFrame() {
  let birdBottom = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-bottom"))
  if(birdBottom >= 144 && (birdBottom + parseFloat(getComputedStyle(bird).getPropertyValue("--bird-height"))) <= 690) {
    return true
  } return false
}

export function getBirdRect() {
  return bird.getBoundingClientRect()
}

