const conditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const alg = {
	wins: 0,
	losses: 0,
	draws: 0,
	moves: 0
}

function easyDriver(board, playerIndex) {
	alg.wins = 0
	alg.losses = 0
	alg.draws = 0
	alg.moves = 0
	const player = playerIndex === 0 ? 'x' : 'o'
	const moves = []
	getMoves(board, player).forEach((returnedMove) => {
		const newMoveObj = {
			move: returnedMove,
		}
		moves.push(newMoveObj)
	})

	moves.forEach(
		(move) =>
			(move.score = scoreBoard(
				generateBoard(board, move.move),
				player,
				player,
				0
			))
	)

	const validMoves = moves.filter((score) => score.move.player)
	const highestScore = validMoves.reduce(
		(highScore, move) => (move.score > highScore ? move.score : highScore),
		validMoves[0].score
	)
	return validMoves.filter((move) => move.score === highestScore)
}

function scoreBoard(board, moveBy, player, depth) {
	alg.moves++
	const boardResult = gameOver(board, player)
	if (boardResult !== false) {
		if (depth === 0) return boardResult === 1 ? Infinity : Infinity * -1
		return boardResult / (depth + 1)
	}

	const nextMover = moveBy === 'x' ? 'o' : 'x'

	const boards = getMoves(board, nextMover).map((move) =>
		move.player ? generateBoard(board, move) : null
	)

	return boards.reduce(
		(score, board) =>
			board ? score + scoreBoard(board, nextMover, player, depth + 1) : score,
		0
	)
}

function generateBoard(board, move) {
	if (move.player === null) return null
	const newBoard = [...board]
	newBoard[move.toIndex] = move.player
	return newBoard
}

function getMoves(board, nextPlayer) {
	const moves = []
	board.forEach((position, index) =>
		moves.push({
			player: position ? null : nextPlayer,
			toIndex: index,
		})
	)
	return moves
}

const gameOver = (board, player) => {
	const opponent = player === 'x' ? 'o' : 'x'
	if (board === null) return 0
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === player)
		)
	) {
		alg.wins++
		return 1
	}
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === opponent)
		)
	) {
		alg.losses++
		return -1
	}
	if (board.every((pos) => pos)) {
		alg.draws++
		return 0
	}
	return false
}

function getAlgNumbers() {
	return alg
}

module.exports = { easyDriver, getAlgNumbers }
