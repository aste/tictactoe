// const _winComb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// let _boardArr = ["none", 'none', "x", "x", 'none', "x", 'none', "none", "o"]

// let _noneIndices = (arr) => {
//     let _noneIndices = []
//     arr.forEach((e, i) => { if (e == 'none') { _noneIndices.push(i) } })
//     return _noneIndices
// }

// const _checkForWin = () => {
//     let winConditionMet = []
//     let winMark = undefined
//     const isAxisEqual = arr => arr.every(val => { if (val != "none") { return val == arr[0] } })
//     _winComb.forEach(i => {
//         let axisVal = []
//         i.forEach(j => { axisVal.push(_boardArr[j]) })
//         if (isAxisEqual(axisVal)) { winMark = axisVal[0] }
//         winConditionMet.push(isAxisEqual(axisVal))
//     })
//     return [winConditionMet.includes(true), winMark]
// }

// let youPlayerMark = 'x'
// let botPlayerMark = 'o'
// let iter = 0
// let level = 90

// function minimax(newBoard, player) {
//     iter++
//     let emptySquareIndices = _noneIndices(newBoard)
    
//     if (_checkForWin()[0]) {
//         if (_checkForWin()[1] == "x") {
//             return { score: -10 }
//         } else if (_checkForWin()[1] == "o") {
//             return { score: +10 }
//         }
//     } else if (emptySquareIndices.length == 0) {
//         return { score: 0 }
//     }
    
//     let moves = []
    
//     for (let i = 0; i < emptySquareIndices.length; i++) {
        
//         let move = {}
//         move.index = emptySquareIndices[i]

//         newBoard[emptySquareIndices[i]] = player
        
        
//         if (player == botPlayerMark) {
//             let g = minimax(newBoard, youPlayerMark)
//             move.score = g.score
//         } else {
//             let g = minimax(newBoard, botPlayerMark)
//             move.score = g.score
//         }
//         newBoard[emptySquareIndices[i]] = move.index
//         moves.push(move)
//     }
//     let bestMove

//     if (player == botPlayerMark) {
//         let bestScore = -10000
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score > bestScore) {
//                 bestScore = moves[i].score
//                 bestMove = i
//             }
//         }
//     } else {
//         let bestScore = 10000
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score < bestScore) {
//                 bestScore = moves[i].score
//                 bestMove = i
//             }
//         }
//     }
    
//     return moves[bestMove].index
// }

// let botsonIndex = minimax(_boardArr, botPlayerMark)

