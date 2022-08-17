// Guidelines for this exercise, use:
// 1) Self-contained modules and as little and as little global code as possible
// 2) The Revealing Module Pattern for cases with single instances
// 3) Factory Functions for cases with multiple instances

// A Factory Function for multiple player instances
function player(name, mark) {
    return { name, mark }
}

let game = (() => {

    // Factory Function Player Declaration
    let botson = player("botson", "o")
    let you = player("you", "x")

    // Private Methods & Values
    let _activePlayer = you;

    // Public Methods
    const changeActivePlayer = () => _activePlayer = _activePlayer == you ? botson : you
    const activePlayerMark = () => _activePlayer.mark
    // Revealing/returning public methods & values
    return {
        changeActivePlayer,
        activePlayerMark
    }

})()

// Encapsulating the TicTacToe game within an IIFE, using Closures and Revealing Module Pattern
let gameBoard = (() => {

    // Cache DOM
    const board = document.querySelector('#board')
    const yourscore = document.querySelector('.yourscore')
    const botsonscore = document.querySelector('.botsonsscore')

    // Private Methods & Values

    // let _boardArr = ['none', 'none', 'none', 'x', 'x', 'o', 'x', 'x', 'x'] //placeholder
    let _boardArr = new Array(9).fill("none")
    const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

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

    const _winSequence = () => {
        console.log(`The winner is ${game.activePlayerMark()}`)
    }


    // Public Methods & Values
    function updateDomBoard() {
        while (board.firstChild) { board.removeChild(board.lastChild) }
        _boardArr.forEach((item) => {
            const square = document.createElement('div')
            square.classList.add('square', `${item}`)
            board.appendChild(square)
        })
        addSquareEvents()
    }


    function addSquareEvents() {
        Array.from(board.children).forEach((element, index) => {
            if (element.className == 'square none') {
                let count = 0;
                element.addEventListener('click', () => {
                    _boardArr[index] = game.activePlayerMark()
                    updateDomBoard()
                    if (_checkWin()) { _winSequence() }
                    game.changeActivePlayer()
                    if (_boardArr.includes('none')) {
                        // delay timer
                        // Botson move
                        // check for win

                    } // else draw
                })


            }
        })
    }

    // Initialize Game
    updateDomBoard()
})()

