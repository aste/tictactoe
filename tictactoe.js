// Messagelines for this exercise, use:
// 1) Self-contained modules and as little and as little global code as possible
// 2) The Revealing Module Pattern for cases with single instances
// 3) Factory Functions for cases with multiple instances

// A Factory Function for multiple player instances
function player(name, mark, score) {
    return { name, mark, score }
}

// Encapsulating the TicTacToe game within an IIFE, using Closures and Revealing Module Pattern
let gameState = (() => {

    // Factory Function Player Declaration
    let botson = player('botson', 'o', 0)
    let you = player('you', 'x', 0)

    // Private Methods & Values
    let _activePlayer = botson;

    // Public Methods
    const changeActivePlayer = () => _activePlayer = _activePlayer == you ? botson : you
    const setActivePlayer = () => { _activePlayer = you }
    const activePlayerAddPoint = () => _activePlayer.score += 1
    const activePlayerMark = () => _activePlayer.mark
    const activePlayerName = () => _activePlayer.name
    const getYourScore = () => you.score
    const getBotsonScore = () => botson.score
    const resetScore = () => {
        you.score = 0
        botson.score = 0
    }

    // Initialize Game
    setActivePlayer()

    // Revealing/returning public methods & values
    return {
        changeActivePlayer,
        activePlayerMark,
        activePlayerName,
        activePlayerAddPoint,
        setActivePlayer,
        getYourScore,
        getBotsonScore,
        resetScore,
    }
})()

let game = (() => {

    // Cache DOM
    const board = document.querySelector('#board')
    const yourHtmlScore = document.querySelector('.yourscore')
    const botsonHtmlScore = document.querySelector('.botsonscore')
    const gameMessage = document.querySelector('#gameMessage')

    // Private Methods & Values
    let _boardArr;
    const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // Private Methods
    const _checkWin = () => {
        let winConditionMet = []
        const isAxisEqual = arr => arr.every(val => { if (val != "none") { return val == arr[0] } })
        _winComb.forEach(i => {
            let axisVal = []
            i.forEach(j => { axisVal.push(_boardArr[j]) })
            winConditionMet.push(isAxisEqual(axisVal))
        })
        return winConditionMet.includes(true)
    }

    const _drawSequence = () => {
        _setGameMessage(4)
    }
    const _winSequence = () => {
        gameState.activePlayerAddPoint()
        _setGameMessage(3)
        _updateScore()
    }



    const _setDifficulty = () => { }

    const _setGameMessage = (num) => {
        if (num == 0) { gameMessage.innerHTML = "Select Botson's difficulty level and place your first cross!" }
        if (num == 1) { gameMessage.innerHTML = "It is your turn, place your cross" }
        if (num == 2) { gameMessage.innerHTML = "Please wait while Botson is considering the next move" }
        if (num == 3) { gameMessage.innerHTML = `Game over, ${gameState.activePlayerName()} won!  Click New Game to try again` }
        if (num == 4) { gameMessage.innerHTML = `It's a draw! Click New Game to try again` }
    }

    const _updateScore = () => {
        yourHtmlScore.innerHTML = gameState.getYourScore()
        botsonHtmlScore.innerHTML = gameState.getBotsonScore()
    }

    function _updateDomBoard() {
        while (board.firstChild) { board.removeChild(board.lastChild) }
        _boardArr.forEach((item) => {
            const square = document.createElement('div')
            square.classList.add('square', `${item}`)
            board.appendChild(square)
        })
        // _addSquareEvents()

    }



    function _addSquareEvents() {
        Array.from(board.children).forEach((element, index) => {
            if (element.className == 'square none') {
                element.addEventListener('click', () => {
                    _boardArr[index] = gameState.activePlayerMark()
                    _updateDomBoard()
                })
            }
        })
    }

    // Public Methods
    const resetMatch = () => {
        gameState.resetScore()
        _updateScore()
        newGame()
    }

    const newGame = () => {
        _boardArr = new Array(9).fill("none")
        _updateDomBoard()
        _setGameMessage(0)
        gameState.setActivePlayer()
    }

    const _gameFlow = () => { 
        if (_checkWin()) { _winSequence() } else { 
            if (_boardArr.includes('none')) {
                if (activePlayerName = 'you') {
                    _addSquareEvents()
                } else {

                }
            } else { _drawSequence() }
            gameState.changeActivePlayer()
        }
        
    // console.log(`Next active player is ${gameState.activePlayerName()}`)
    
    // Initialize Game
    resetMatch()

    return {
        newGame,
        resetMatch,
    }

})()

