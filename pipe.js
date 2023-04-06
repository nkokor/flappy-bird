const PIPE_DISTANCE = 120
const PIPE_INTERVAL = 600
const PIPE_SPEED = 0.23

const pipes = []

let timeSinceLastPipe = 0

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
  console.log(topPipeHeight)
  pipeElem.style.setProperty("--position-top", topPipeHeight)

  const pipe = {
   get left() {
      let pipeLeft = parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
      return pipeLeft
    },
    set left(left) {
      pipeElem.style.setProperty("--pipe-left", left)
    }
  }
  
  pipe.left = 500;
  let gameDiv = document.getElementById("game-div")
  gameDiv.appendChild(pipeElem)
  pipes.push(pipe)
}

function createPipeSegment(position) {
  const segment = document.createElement("img")
  segment.classList.add("segment", position)
  if(position == "top") {
    segment.src = "images/pipe_top.png"
  } else {
    segment.src = "images/pipe_bottom.png"
  }
  return segment
}

export function updatePipes(delta) {
  timeSinceLastPipe = timeSinceLastPipe + delta

  if(timeSinceLastPipe >  PIPE_INTERVAL) {
    timeSinceLastPipe = timeSinceLastPipe - PIPE_INTERVAL
    createPipe()
  }
  pipes.forEach(pipe => {
    pipe.left = pipe.left - delta * PIPE_SPEED
  })
}