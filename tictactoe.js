// Guidelines for this exercise, use:
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
    const getYourMark = () => you.mark
    const getBotsonMark = () => botson.mark
    const resetScore = () => {
        you.score = 0
        botson.score = 0
    }

    // Initialize Game
    setYouAsActivePlayer()

    // Revealing/returning public methods & values
    return {
        setYouAsActivePlayer,
        changeActivePlayer,
        activePlayerMark,
        activePlayerName,
        activePlayerAddPoint,
        getYourScore,
        getBotsonScore,
        getYourMark,
        getBotsonMark,
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

    // Private Variables
    let _boardArr
    const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // Private Methods
    const _setGameMessage = (num) => {
        if (num == 0) { gameMessage.innerHTML = "Set difficulty level and place your first cross" }
        if (num == 1) { gameMessage.innerHTML = "It is your turn, place your cross" }
        if (num == 2) { gameMessage.innerHTML = "Botson is considering the next move" }
        if (num == 3) { gameMessage.innerHTML = `It's a draw! Click New Game to try again` }
        if (num == 4) { gameMessage.innerHTML = `Game over, ${gameState.activePlayerName()} won!  Click New Game to try again` }
    }

    const _checkForWin = (boardToTest) => {
        let winConditionMet = []
        let winMark = undefined
        const isAxisEqual = arr => arr.every(val => { if (val != "none") { return val == arr[0] } })
        _winComb.forEach(i => {
            let axisVal = []
            i.forEach(j => { axisVal.push(boardToTest[j]) })
            if (isAxisEqual(axisVal)) { winMark = axisVal[0] }
            winConditionMet.push(isAxisEqual(axisVal))
        })
        return [winConditionMet.includes(true), winMark]
    }

    const _updateScore = () => {
        yourHtmlScore.innerHTML = gameState.getYourScore()
        botsonHtmlScore.innerHTML = gameState.getBotsonScore()
    }

    function _updateDomBoard() {
        while (board.firstChild) { board.removeChild(board.lastChild) }
        _boardArr.forEach((item) => {
            const square = document.createElement('div')
            if (typeof item == 'number') {
                square.classList.add('square', 'none')
            } else { square.classList.add('square', `${item}`) }
            board.appendChild(square)
        })

    }

    function _addSquareEvents() {
        Array.from(board.children).forEach((element, index) => {
            if (element.className == 'square none') {
                element.addEventListener('click', () => {
                    _boardArr[index] = gameState.activePlayerMark()
                    _updateDomBoard()
                    gameFlow()
                })
            }
        })
    }

    const _winSequence = () => {
        gameState.activePlayerAddPoint()
        _updateScore()
        _setGameMessage(4)
    }

    const gameFlow = () => {
        // Continue game flow after human selection

        if (_checkForWin(_boardArr)[0]) { _winSequence() }
        else if (_boardArr.includes('none')) {
            _setGameMessage(2)
            setTimeout(() => {
                gameState.changeActivePlayer()
                placeBotsonMark()
                _updateDomBoard()
                if (_checkForWin(_boardArr)[0]) { _winSequence() }
                else {
                    gameState.changeActivePlayer()
                    _addSquareEvents()
                    _setGameMessage(1)
                }
            }, Math.floor( 500 + Math.random() * 750))
        } else {
            _setGameMessage(3)
        }
    }

    const placeBotsonMark = () => {
        let iter = 0
        let _arrBoardClone = _boardArr.map((e, i) => { if (e === 'none') { e = i } { return e } })
        let _availableIndices = arr => arr.filter(s => s != "o" && s != "x")
        let youPlayerMark = gameState.getYourMark()
        let botPlayerMark = gameState.getBotsonMark()
        let _level = select.options[select.selectedIndex].value
        let randomZeroToOne = Math.random() * 100
        console.log(randomZeroToOne)
        console.log(_level)
        console.log(randomZeroToOne < _level)
        console.log("")

        let resultObj = minimax(_arrBoardClone, botPlayerMark)

        _boardArr[resultObj.index] = gameState.activePlayerMark()

        function minimax(newBoard, player) {
            iter++
            let emptySquareIndices = _availableIndices(newBoard)
            let moves = []
            let bestMove

            // Returns a score value if a terminal game state, win or draw, is found
            
            if (_checkForWin(newBoard)[0] || emptySquareIndices.length === 0) {
                if (randomZeroToOne < _level) {
                    if (_checkForWin(newBoard)[1] == "x") { return { score: -10 } }
                    else if (_checkForWin(newBoard)[1] == "o") { return { score: 10 } }
                    else if (emptySquareIndices.length === 0) { return { score: 0 } }
                } else {
                    if (_checkForWin(newBoard)[1] == "x") { return { score: 0 } }
                    else if (_checkForWin(newBoard)[1] == "o") { return { score: 0 } }
                    else if (emptySquareIndices.length === 0) { return { score: 0 } }
                }
        }

            // Go through available spots on the board
            for (let i = 0; i < emptySquareIndices.length; i++) {
                var move = {}
                move.index = emptySquareIndices[i]
                newBoard[emptySquareIndices[i]] = player


                // Recursively call minimax on available squares to exhaustively search all options
                if (player == botPlayerMark) {
                    let result = minimax(newBoard, youPlayerMark)
                    move.score = result.score
                } else {
                    let result = minimax(newBoard, botPlayerMark)
                    move.score = result.score
                }

                newBoard[emptySquareIndices[i]] = move.index
                moves.push(move)
            }

            // Evaluate the returning score values from the function calls to find the best move
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
            // Return the best values
            return moves[bestMove]
        }
        return resultObj
    }

    const resetMatch = () => {
        gameState.resetScore()
        _updateScore()
        newGame()
    }

    const newGame = () => {
        _boardArr = new Array(9).fill("none")
        _updateDomBoard()
        _addSquareEvents()
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