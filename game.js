document.addEventListener("DOMContentLoaded", () => {
  let gameDiv = document.getElementById("game-div")
  let sky = document.getElementById("sky-div")
  let ground = document.getElementById("ground-div")
  let bird = document.getElementById("bird-div")

  let birdPositionLeft = 140
  let birdPositionBottom = 130

  let gravity = 2

  function startGame() {
    if(birdPositionBottom > 35) {
      birdPositionBottom = birdPositionBottom - gravity
      birdPositionBottom = birdPositionBottom - gravity
      bird.style.left = birdPositionLeft + "px"
      bird.style.bottom = birdPositionBottom + "px"
    }
    return
  }

  setInterval(startGame, 30)


  //flying
  function flyUp(event) {
    if(event.keyCode === 38 || event.keyCode === 32 || event.keyCode === 104) {
      if(birdPositionBottom < 410) {
        birdPositionBottom = birdPositionBottom + 40
        bird.style.bottom = birdPositionBottom
      }
    }
  }

  document.addEventListener("keyup", flyUp)

  //obstacles
  function createObstacle() {
    let obstaclePositionLeft = 550
    let randomObstacleHeight = Math.random() * 270
    let obstaclePositionBottom = 0
    let obstacle = document.createElement('div')
    obstacle.classList.add("obstacle-div")
    sky.appendChild(obstacle)
    obstacle.style.left = obstaclePositionLeft + "px"
    obstacle.style.bottom = obstaclePositionBottom + "px"
    obstacle.style.height = randomObstacleHeight + "px"

    function moveObstacle() {
      obstaclePositionLeft = obstaclePositionLeft - 2
      obstacle.style.left = obstaclePositionLeft + 'px'

      if(obstaclePositionLeft === -60) {
        clearInterval(timer)
        sky.removeChild(obstacle)
       }
    }
    let timer = setInterval(moveObstacle, 24)
  }

  createObstacle()
})