document.addEventListener("DOMContentLoaded", () => {
  let gameDiv = document.getElementById("game-div")
  let ground = document.getElementById("ground-div")
  let bird = document.getElementById("bird-div")

  let birdPositionLeft = 140
  let birdPositionBottom = 130

  let gravity = 2

  function startGame() {
    birdPositionBottom = birdPositionBottom - gravity
    bird.style.left = birdPositionLeft + "px"
    bird.style.bottom = birdPositionBottom + "px"
  }

  setInterval(startGame, 30)

  function flyUp() {
    birdPositionBottom = birdPositionBottom + 40
    bird.style.bottom = birdPositionBottom
  }

  document.addEventListener("keyup", flyUp)
})