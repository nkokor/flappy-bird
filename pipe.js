const Pipe = (() => {
  const pointAudio = new Audio("sound_effects/point.mp3")

  const PIPE_DISTANCE = 120
  const PIPE_INTERVAL = 900
  const PIPE_SPEED = 0.20
  
  let score = document.getElementById("score")
  
  let pipes = []
  
  let timeSinceLastPipe = 0
  
  let passedPipesCount = 0

  let firstPipe = false
  
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
      get passed() {
        let pipePassed = false
        return pipePassed
      },
      set passed(passed) {
        pipePassed = passed
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

  function setupPipes() {
    timeSinceLastPipe = PIPE_INTERVAL
    passedPipesCount = 0
    firstPipe = true
  }
  
  function updatePipes(delta) {
    timeSinceLastPipe = timeSinceLastPipe + delta
  
    if(timeSinceLastPipe >  PIPE_INTERVAL) {
      timeSinceLastPipe = timeSinceLastPipe - PIPE_INTERVAL
      createPipe()
    }
    pipes.forEach(pipe => {
      if(pipe.passed == false && pipe.left <= 85) {
        if(firstPipe == true) {
          firstPipe = false
          passedPipesCount = passedPipesCount + 1
          score.innerText = "Score: " + passedPipesCount
        }
        pipe.passed = true;
        pointAudio.play()
      }
      if(pipe.left + 60 < 0) {
        passedPipesCount = passedPipesCount + 1
        score.innerText = "Score: " + passedPipesCount
        return pipe.remove()
      }
      pipe.left = pipe.left - delta * PIPE_SPEED
    })
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





