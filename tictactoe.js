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
    let _activePlayer

    // Public Methods
    const changeActivePlayer = () => _activePlayer = _activePlayer == you ? botson : you
    const setYouAsActivePlayer = () => { _activePlayer = you }
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
    setYouAsActivePlayer()

    // Revealing/returning public methods & values
    return {
        changeActivePlayer,
        activePlayerMark,
        activePlayerName,
        activePlayerAddPoint,
        setYouAsActivePlayer,
        getYourScore,
        getBotsonScore,
        resetScore
    }
})()

let game = (() => {

    // Cache DOM
    const board = document.querySelector('#board')
    const yourHtmlScore = document.querySelector('.yourscore')
    const botsonHtmlScore = document.querySelector('.botsonscore')
    const gameMessage = document.querySelector('#gameMessage')
    const select = document.querySelector('#difficulty')

    let level = select.options[select.selectedIndex].value

    console.log(level)

    // Private Methods & Values
    let _boardArr
    const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // Private Methods
    const _checkForWin = () => {
        let winConditionMet = []
        let winMark = undefined
        const isAxisEqual = arr => arr.every(val => { if (val != "none") { return val == arr[0] } })
        _winComb.forEach(i => {
            let axisVal = []
            i.forEach(j => { axisVal.push(_boardArr[j]) })
            if (isAxisEqual(axisVal)) { winMark = axisVal[0] }
            winConditionMet.push(isAxisEqual(axisVal))
        })
        return [winConditionMet.includes(true), winMark]
    }

    const _setDifficulty = () => { }
    const _drawSequence = () => { _setGameMessage(3) }
    const _winSequence = () => {
        gameState.activePlayerAddPoint()
        _setGameMessage(4)
        _updateScore()
    }

    let _noneIndices = (arr) => {
        let noneIndices = []
        arr.forEach((e, i) => { if (e == 'none') { noneIndices.push(i) } })
        return noneIndices
    }

    const _setGameMessage = (num) => {
        if (num == 0) { gameMessage.innerHTML = "Set difficulty level and place your first cross" }
        if (num == 1) { gameMessage.innerHTML = "It is your turn, place your cross" }
        if (num == 2) { gameMessage.innerHTML = "Botson is considering the next move" }
        if (num == 3) { gameMessage.innerHTML = `It's a draw! Click New Game to try again` }
        if (num == 4) { gameMessage.innerHTML = `Game over, ${gameState.activePlayerName()} won!  Click New Game to try again` }
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
        _addSquareEvents()
    }


    function _addSquareEvents() {
        Array.from(board.children).forEach((element, index) => {
            if (element.className == 'square none') {
                element.addEventListener('click', () => {
                    _boardArr[index] = gameState.activePlayerMark()
                    _updateDomBoard()
                    if (_checkForWin()[0]) { _winSequence() } else {
                        if (_boardArr.includes('none')) {
                            // Delay Botson sequence
                            // check for win
                            //  gameState.changeActivePlayer()
                        } else { _drawSequence() }
                    }
                })
            }
        })
    }

    let youPlayerMark = 'x'
    let botPlayerMark = 'o'
    let iter = 0
    // let level = 90

    function minimax(newBoard, player) {
        iter++
        let emptySquareIndices = _noneIndices(newBoard)

        if (_checkForWin()[0]) {
            if (_checkForWin()[1] == "x") {
                return { score: -10 }
            } else if (_checkForWin()[1] == "o") {
                return { score: +10 }
            }
        } else if (emptySquareIndices.length == 0) {
            return { score: 0 }
        }

        let moves = []

        for (let i = 0; i < emptySquareIndices.length; i++) {

            let move = {}
            move.index = emptySquareIndices[i]

            newBoard[emptySquareIndices[i]] = player


            if (player == botPlayerMark) {
                let g = minimax(newBoard, youPlayerMark)
                move.score = g.score
            } else {
                let g = minimax(newBoard, botPlayerMark)
                move.score = g.score
            }
            newBoard[emptySquareIndices[i]] = move.index
            moves.push(move)
        }
        let bestMove

        if (player == botPlayerMark) {
            let bestScore = -10000
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        } else {
            let bestScore = 10000
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        }

        return moves[bestMove].index
    }

    // let botsonIndex = minimax(_boardArr, botPlayerMark)

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
        gameState.setYouAsActivePlayer()
    }

    // Initialize Game
    resetMatch()

    return {
        newGame,
        resetMatch
    }

})()
