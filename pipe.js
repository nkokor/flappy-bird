const Pipe = (() => {
  const PIPE_DISTANCE = 120
  const PIPE_INTERVAL = 800
  const PIPE_SPEED = 0.20
  
  let pipes = []
  
  let timeSinceLastPipe = 0
  
  let passedPipesCount = 0
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) 
  }
  
  function createPipe() {
    const pipeElem = document.createElement("div")
    const topPipe = createPipeSegment("top")
    const bottomPipe = createPipeSegment("bottom")
    pipeElem.append(topPipe)
    pipeElem.append(bottomPipe)
    pipeElem.classList.add("pipe")
    let position = randomNumberBetween(0, 144)
    pipeElem.style.setProperty("--position-bottom", -1 * position)
    let topPipeHeight = -1 * (300 - position - PIPE_DISTANCE)
    pipeElem.style.setProperty("--position-top", topPipeHeight)
  
    const pipe = {
     get left() {
        let pipeLeft = parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        return pipeLeft
      },
      set left(left) {
        pipeElem.style.setProperty("--pipe-left", left)
      },
      get top() {
        return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--position-top"))
      },
      get bottom() {
        return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--position-bottom"))
      },
      rects() {
        return [
          topPipe.getBoundingClientRect(),
          bottomPipe.getBoundingClientRect()
        ]
      },
      remove() {
        pipes = pipes.filter(p => p !== pipe)
        pipeElem.remove()
      }
    }
    pipe.left = 500
    let gameDiv = document.getElementById("game-div")
    gameDiv.appendChild(pipeElem)
    pipes.push(pipe)
  }
  
  function createPipeSegment(position) {
    let gameDiv = document.getElementById("game-div")
    let segment = document.createElement("img")
    segment.classList.add("segment", position)
    if(position == "top") {
      segment.src = "images/pipe_top.png"
    } else {
      segment.src = "images/pipe_bottom.png"
    }
    gameDiv.appendChild(segment)
    return segment
  }
  
  function areCollided(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }
  
  function updatePipes(delta) {
    timeSinceLastPipe = timeSinceLastPipe + delta
  
    if(timeSinceLastPipe >  PIPE_INTERVAL) {
      timeSinceLastPipe = timeSinceLastPipe - PIPE_INTERVAL
      createPipe()
    }
    pipes.forEach(pipe => {
      if(pipe.left + 60 < 0) {
        passedPipesCount = passedPipesCount + 1
        return pipe.remove()
      }
      pipe.left = pipe.left - delta * PIPE_SPEED
    })
  }
  
  function setupPipes() {
    timeSinceLastPipe = PIPE_INTERVAL
    passedPipesCount = 0
  }
  
  function getPassedPipesCount() {
    return passedPipesCount
  }
  
  function getPipeRects() {
    return pipes.flatMap(pipe => pipe.rects())
  }
  
  function removePipes() {
    pipes.forEach(pipe => {
      pipe.remove()
    })
  }

  return {
    removePipes,
    getPassedPipesCount, 
    setupPipes,
    updatePipes,
    getPipeRects
  }
})();





