const main = document.getElementById('main')
const scoreDisplay = document.getElementById('score')
const failDisplay = document.getElementById('fail')
const timerDisplay = document.getElementById('timer')
const modalOver = document.getElementById('modalOver')
const modalPause = document.getElementById('modalPause')
const modalOverTitle = document.getElementById('modalTitle')
const modalOverDescription = document.getElementById('modalDescription')

const virusOne = document.getElementById('virus1')
const virusOneStyle = window.getComputedStyle(virusOne)
const virusTwo = document.getElementById('virus2')
const virusTwoStyle = window.getComputedStyle(virusTwo)
const virusThree = document.getElementById('virus3')
const virusThreeStyle = window.getComputedStyle(virusThree)
const virusFour = document.getElementById('virus4')
const virusFourStyle = window.getComputedStyle(virusFour)

const colOne = document.getElementById('col1')
const colTwo = document.getElementById('col2')
const colThree = document.getElementById('col3')
const colFour = document.getElementById('col4')

let score = 0
let fail = 0
let gameOn = true
let timer = 0
const virusMovings = [ setVirusOneMoving, setVirusTwoMoving, setVirusThreeMoving, setVirusFourMoving]

window.addEventListener("DOMContentLoaded", function () {
    randomVirusMoving()
    gameOverCondition()
    startTimer()
    window.addEventListener('keyup', listenKeybaord)
})

function setVirusOneMoving() {
    if (gameOn) {        
        setTimeout(() => {
            const top = parseInt(virusOneStyle.marginTop)
            virusOne.style.marginTop = (top + 1) + 'px'
            setVirusOneMoving()
            if (top > 500) {
                virusOne.style.marginTop = '-50px'
                fail += 1
            } 
            scoreDisplay.innerHTML = score
            failDisplay.innerHTML = fail
        }, 1);
    }
}
function setVirusTwoMoving() {
    if (gameOn) {
        setTimeout(() => {
            const top = parseInt(virusTwoStyle.marginTop)
            virusTwo.style.marginTop = (top + 1) + 'px'
            setVirusTwoMoving()
            if (top > 500) {
                virusTwo.style.marginTop = '-50px'
                fail += 1
            } 
            scoreDisplay.innerHTML = score
            failDisplay.innerHTML = fail
        }, 1);
    }
}
function setVirusThreeMoving() {
    if (gameOn) {
        setTimeout(() => {
            const top = parseInt(virusThreeStyle.marginTop)
            virusThree.style.marginTop = (top + 1) + 'px'
            setVirusThreeMoving()
            if (top > 500) {
                virusThree.style.marginTop = '-50px'
                fail += 1
            } 
            scoreDisplay.innerHTML = score
            failDisplay.innerHTML = fail
        }, 1);
    }
}
function setVirusFourMoving() {
    if (gameOn) {
        setTimeout(() => {
            const top = parseInt(virusFourStyle.marginTop)
            virusFour.style.marginTop = (top + 1) + 'px'
            setVirusFourMoving()
            if (top > 500) {
                virusFour.style.marginTop = '-50px'
                fail += 1
            } 
            scoreDisplay.innerHTML = score
            failDisplay.innerHTML = fail
        }, 1);
    }
}
function listenKeybaord(e) {
    // D F J K
    if (gameOn) {
        if (e.code == 'KeyD') {
            colOne.style.backgroundColor = 'white'
            setTimeout(() => {
                colOne.style.backgroundColor = 'gray'
            }, 150);
            const virusPosition = parseInt(virusOneStyle.marginTop)
            if (virusPosition > 250) {
                virusOne.style.marginTop = '-100px'
                score += 1
            }
        } else if (e.code == 'KeyF') {
            colTwo.style.backgroundColor = 'white'
            setTimeout(() => {
                colTwo.style.backgroundColor = 'gray'
            }, 150);
            const virusPosition = parseInt(virusTwoStyle.marginTop)
            if (virusPosition > 250) {
                virusTwo.style.marginTop = '-100px'
                score += 1
            }
        } else if (e.code == 'KeyJ') {
            colThree.style.backgroundColor = 'white'
            setTimeout(() => {
                colThree.style.backgroundColor = 'gray'
            }, 150);
            const virusPosition = parseInt(virusThreeStyle.marginTop)
            if (virusPosition > 250) {
                virusThree.style.marginTop = '-100px'
                score += 1
            }
        } else if (e.code == 'KeyK') {
            colFour.style.backgroundColor = 'white'
            setTimeout(() => {
                colFour.style.backgroundColor = 'gray'
            }, 150);
            const virusPosition = parseInt(virusFourStyle.marginTop)
            if (virusPosition > 250) {
                virusFour.style.marginTop = '-100px'
                score += 1
            }
        }
    }
    if (e.code == 'Escape') {
        if (gameOn ) {
            pauseGame()  
        } else {
            resumeGame()
        }
    }
}
function startTimer() {
    if (gameOn) {   
        setTimeout(() => {
            timer += 1
            timerDisplay.innerHTML = timer
            startTimer()
        }, 1000);
    }
}
function randomVirusMoving() {
    if (gameOn) {
        const shuffle = virusMovings.sort(randomComparator)
        shuffleFunction(0)
           
        function shuffleFunction(i) {
            if (i<shuffle.length) {
                setTimeout(() => {
                    shuffle[i]()
                    shuffleFunction(i + 1)
                }, 500);
            }
        }
    }
}

function randomComparator() {
    return Math.random() - 0.5
}

function gameOverCondition() {
    if (gameOn) {   
        setTimeout(() => {
            if (fail >= 10) {
                openModalOver(score)
                gameOn = false
            }
            gameOverCondition()
        }, 100);
    }
}

function openModalOver(score) {
    modalOver.style.display = 'block'
    modalOverDescription.innerHTML = 'Score : ' + score + ', Time : ' + timer + 's'
}

function closeModalOver() {
    modalOver.style.display = 'none'
}

function pauseGame() {
    gameOn = false
    modalPause.style.display = 'block'
}
function resumeGame() {
    gameOn = true
    randomVirusMoving()
    gameOverCondition()
    startTimer()
    modalPause.style.display = 'none'
}