// Guidelines for this exercise, use:
// 1) Self-contained modules and as little and as little global code as possible
// 2) The Revealing Module Pattern for cases with single instances
// 3) Factory Functions for cases with multiple instances

// A Factory Function for multiple player instances
function createPlayer(name, id) {
    return { name, id }
}

// Encapsulating the TicTacToe game within an IIFE, using Closures and Revealing Module Pattern
let gameBoard = (() => {
    // Cache DOM
    const board = document.querySelector('#board')

    // Private methods and values
    let _boardArr = ["none", "x", "o", "x", "o", "none", "x", "o", "none"] // Temp Placeholder
    // let _boardArr = new Array(9).fill("none");
    const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // Public methods and values
    function updateBoard() {
        _boardArr.forEach((i) => {
            const square = document.createElement('div')
            square.classList.add('square', `${i}`)
            board.appendChild(square)
        })
    }

    function setSquareValue(sqIndex, sqVal) {
        if (_boardArr[sqIndex] == "none") {
            square.addEventListener('click', () => {
                _boardArr[sqIndex] = sqVal
            })
            
            updateBoard()
        }
    }

    return {
        updateBoard,
        setSquareValue,
    }
})()


let gameController = (() => {

})




gameBoard.updateBoard()
let you = createPlayer("You", "x")
let computer = createPlayer("Botson", "o")

// console.log(you)
// console.log(computer)




// Factory Functions
// We can take advantage of scopes and use functions to create objects that have private variables or variables that can only be accessed by the object itself.

// function Poodle(name, owner) {
//     const breed = "poodle"
//     let sound = "Woof"
//     const introduce = () => `I'm a ${breed} named ${name}. My owner is ${owner}.`
//     function setSound(s) {
//         sound = s
//     }
//     return {
//         talk: () => `${sound}! ${introduce()}`,
//         setSound: setSound
//     }
// }

// The Module Pattern
// If you need a special object with private variables but you don't need a factory because you
// don't need several of these objects. Notice that a module pattern is basically a factory
// function packaged into an IIFE.

// tipCalculator = (() => {
//     // anything we need to do to set up the calculator goes here
//     const roundToHundreths = num => Math.round(100 * num) / 100
//     const findPercentage = (percent, amount) => roundToHundreths(amount * percent)
//     return {
//         // the calculator functions we choose to "expose" to the user
//         fifteen: amount => `$${findPercentage(0.15, amount)}`,
//         twenty: amount => `$${findPercentage(0.20, amount)}`,
//         twentyFive: amount => `$${findPercentage(0.25, amount)}`,
//         thirty: amount => `$${findPercentage(0.30, amount)}`
//     }
// })()



// Immediately Invoked Function Expression (IIFE)
// A staple programming pattern is the IIFE. Essentially we define a function and run it
// immediately.
// These are used to avoid "polluting" the global scope and use private variables to accomplish 
// a task.

// iifeExample = {
//     let ret;
//     (() => {
//         const mySecret = "dont let the global scope know about this"
//         ret = `return "${mySecret}"`
//     })()
// //notice that we don't have access to mySecret
// return ret
//   }


