

var board = buildboard()



renderBoard(board, '.board')

setMinesNegsCount(board)

function buildboard() {
    const board = []

    for (var i = 0; i < 4; i++) {
        board[i] = []
        for (var j = 0; j < 4; j++) {


            var cell = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false

            }
            board[i][j] = cell
        }
    }

    board[0][0].isMine = true
    board[2][2].isMine = true

    return board
}


function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const cellContent = cell.isMine ? '💣' : ''
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}"onclick="onCellClicked(${i},${j})"></td>`


        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
    console.log("bob");
}
function setMinesNegsCount(board){

    for (let i = 0; i < board.length; i++) {
         for (let j = 0; j < board[0].length; j++) {
          var  cell= board[i][j]
             cell.minesAroundCount = countMineNeighbors(board, i, j)

         }
    }
}

function countMineNeighbors(board, rowIdx, colIdx){

 var  Minecount = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (i === rowIdx && j === colIdx) continue
      if (board[i][j].isMine)  Minecount++
    }
  }
return Minecount
}

function  onCellClicked( i,j) {
    var cell =board[i][j]
var ecell = cell.querySelector(".cell-${i}-${j}")
if (ecell.isMine){
    ecell.innerHTML='💣'

}
else {
    ecell.innerHTML = cell.minesAroundCount > 0 ? cell.minesAroundCount : ''
  }
 ecell.isRevealed=false
  
    
}