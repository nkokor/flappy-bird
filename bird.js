const Bird = (() => {
  const bird = document.getElementById("bird")

  const flyAudio = new Audio("sound_effects/flap.mp3")
  const dieAudio = new Audio("sound_effects/die.mp3")

  const GRAVITY = 0.19 
  const BIRD_SPEED = 0.3
  const JUMP_DURATION = 130
  
  let timeSinceLastJump = Number.POSITIVE_INFINITY
  
  function handleJump(event) {
    if(event.code == "Space") {
      flyAudio.play()
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
  
  function updateBird(delta) {
    if(timeSinceLastJump < JUMP_DURATION) {
      flyUp(delta)
    } else {
      dropDown(delta)
    }
    timeSinceLastJump = timeSinceLastJump + delta
  }
  
  function setupBird() {
    let birdBottom = 380
    bird.style.setProperty("--bird-bottom", birdBottom)
  
    document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)
  }
  
  function isInFrame() {
    let birdBottom = parseFloat(getComputedStyle(bird).getPropertyValue("--bird-bottom"))
    if(birdBottom >= 144 && (birdBottom + parseFloat(getComputedStyle(bird).getPropertyValue("--bird-height"))) <= 690) {
      return true
    } 
    dieAudio.play()
    return false
  }
  
  function getBirdRect() {
    return bird.getBoundingClientRect()
  }

  return {
    getBirdRect,
    isInFrame,
    setupBird,
    updateBird
  }
})();



