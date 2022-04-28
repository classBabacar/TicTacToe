export default class AIPlayer extends TicTacToe {
  constructor (p1, p2) {
    super(p1, p2)
  }

  async getHumanMove () {
    return new Promise(function (resolve) {
      canvas.addEventListener('click', function (user) {
        canvas.removeEventListener('click', user)
        const cRect = canvas.getBoundingClientRect()
        const canvasX = Math.round(user.clientX - cRect.left)
        const canvasY = Math.round(user.clientY - cRect.top)
        resolve([canvasX, canvasY])
      })
    })
  }

  generateAIMove (board, depth, isMaximizingPlayer) {
    if (this.isGameOver(board, 0)) {
      return [null, 1000]
    } else if (this.isTie(board)) {
      return [null, 0]
    } else if (this.isGameOver(board, 1)) {
      return [null, -1000]
    } else if (depth === 0) {
      return [null, this.gameStateCalculator(board)]
    }

    if (isMaximizingPlayer) {
      let maxValue = Number.NEGATIVE_INFINITY
      let bestMovePosition = 'none'
      const availablePositions = this.getAvailablePostions()
      for (let i = 0; i < availablePositions.length; ++i) {
        const [arrayRow, arrayCol] = this.getPositionArrayIndex(availablePositions[i])
        board[arrayRow][arrayCol] = 'O'

        const [move, bestValue] = this.generateAIMove(board, depth - 1, false)
        if (bestValue > maxValue) {
          maxValue = bestValue
          bestMovePosition = availablePositions[i]
        }
        board[arrayRow][arrayCol] = '#'
      }
      return [bestMovePosition, maxValue]
    } else {
      let minValue = Number.POSITIVE_INFINITY
      let bestMovePosition = 'none'
      const availablePositions = this.getAvailablePostions()
      for (let i = 0; i < availablePositions.length; ++i) {
        const [arrayRow, arrayCol] = this.getPositionArrayIndex(availablePositions[i])
        board[arrayRow][arrayCol] = 'X'

        const [move, bestValue] = this.generateAIMove(board, depth - 1, true)
        if (bestValue < minValue) {
          minValue = bestValue
          bestMovePosition = availablePositions[i]
        }
        board[arrayRow][arrayCol] = '#'
      }
      return [bestMovePosition, minValue]
    }
  }

  gameStateCalculator (board) {
    // Cheap heuristic -- If the center is available, choose it but when the dfs search is smaller
    if (board[1][1] === 'O') {
      return 250
    }

    if (board[1][1] === 'X') {
      return -250
    }
  }

  getAvailablePostions () {
    let positionCount = 1
    const positions = []
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        if (this.board[i][j] === '#') {
          positions.push(positionCount)
        }
        positionCount++
      }
    }
    return positions
  }

  async AIplay () {
    while (!this.isGameOver(this.board, this.moveNumber - 1) && !this.isTie(this.board)) {
      let [x, y] = []
      let position = 0
      if (this.moveNumber % 2 === 1) {
        [x, y] = await this.getHumanMove()
        position = this.boxSelection(x, y)
      }
      if (this.moveNumber % 2 === 0) {
        const [move, bestValue] = this.generateAIMove(this.board, 4, true)
        this.storeMove(this.moveNumber, move)
        this.makeMove(move, this.moveNumber)
      } else if (this.moveNumber % 2 === 1 && position > 0 && this.isValidMove(position, this.board)) {
        this.storeMove(this.moveNumber, position)
        this.makeMove(this.boxSelection(x, y), this.moveNumber)
      }
    }
    if (this.isTie(this.board)) {
      this.showTie()
      this.drawTieLine()
    } else {
      this.showWinner(this.moveNumber - 1)
      this.whereToDrawWinningLine(this.board, this.moveNumber - 1)
    }
  }
}
