document.addEventListener("DOMContentLoaded", () => {
  let gameDiv = document.getElementById("game-div")
  let ground = document.getElementById("ground-div")
  let bird = document.getElementById("bird-div")

  let birdPositionLeft = "70px"
  let birdPositionBottom = "80px"

  function startGame() {
    bird.style.left = birdPositionLeft
    bird.style.bottom = birdPositionBottom
  }

  startGame()
})