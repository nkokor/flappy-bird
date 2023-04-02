document.addEventListener("DOMContentLoaded", () => {
  let gameOver = false

  let obstacleGap = 130

  const gameDiv = document.getElementById("game-div")
  const bird = document.getElementById("bird")

  let birdPositionBottom = 300

  let gravity = 3

  function startGame() {
    if(birdPositionBottom > 130) {
      birdPositionBottom = birdPositionBottom - gravity
      bird.style.bottom = birdPositionBottom + "px"
    }
  }

  let gameTimer = setInterval(startGame, 20)

  function endGame() {
    clearInterval(gameTimer)
    gameOver = true
    document.removeEventListener("keyup", flyUp)
  }

  //flying
  function flyUp(event) {
    if(event.keyCode === 38 || event.keyCode === 32 || event.keyCode === 104) {
      if(birdPositionBottom < 590) {
        birdPositionBottom = birdPositionBottom + 50
        bird.style.bottom = birdPositionBottom + "px"
      }
    }
  }

  document.addEventListener("keyup", flyUp)

  //obstacles
  function createObstacle() {
    let obstaclePositionLeft = 500

    let randomBottomObstacleBottom = Math.random() * 120
    if (randomBottomObstacleBottom < 30) {
      randomBottomObstacleBottom += 90
    }

    //bottom obstacle
    const  bottomObstacle = document.createElement('img')
    bottomObstacle.src = "images/pipe_bottom.png"
    bottomObstacle.style.left = obstaclePositionLeft + "px"
    bottomObstacle.style.bottom = randomBottomObstacleBottom + "px"

    //top obstacle
    const topObstacle = document.createElement('img')
    topObstacle.src = "images/pipe_top.png"
    topObstacle.style.left = obstaclePositionLeft + "px"
    topObstacle.style.bottom = randomBottomObstacleBottom + 300 + obstacleGap + "px"

    if(!gameOver) {
      bottomObstacle.classList.add("bottom-obstacle")
      topObstacle.classList.add("top-obstacle")
      gameDiv.appendChild(topObstacle)
      gameDiv.appendChild(bottomObstacle)
    }

    function moveObstacle() {
      obstaclePositionLeft = obstaclePositionLeft - 2
      bottomObstacle.style.left = obstaclePositionLeft + 'px'
      topObstacle.style.left = obstaclePositionLeft + 'px'

      if(obstaclePositionLeft === -65) {
        clearInterval(timer)
        gameDiv.removeChild(bottomObstacle)
        gameDiv.removeChild(topObstacle)
      }

      if((obstaclePositionLeft >= 140 && obstaclePositionLeft <= 200) && (birdPositionBottom <= (randomBottomObstacleBottom + 300) ||
      (birdPositionBottom + 50) >= (randomBottomObstacleBottom + 300 + obstacleGap)
      )) {
        endGame()
        clearInterval(timer)
      }
    }
    let timer = setInterval(moveObstacle, 20)
    if(!gameOver) {
      setTimeout(createObstacle, 2000)
    } 
  }

  createObstacle()
})