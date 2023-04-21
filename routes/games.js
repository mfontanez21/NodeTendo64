import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


// GET /movies/new
router.get('/new', isLoggedIn, gamesCtrl.new)

// POST /movies
router.post('/', isLoggedIn, gamesCtrl.create)

// GET games/index
router.get('/', isLoggedIn, gamesCtrl.index)

router.get('/:gameId', isLoggedIn, gamesCtrl.show)

// localhost:3000/games/:gameId
router.delete("/:gameId", isLoggedIn, gamesCtrl.delete)

router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)

router.post('/:gameId/comments', isLoggedIn, gamesCtrl.addComment)

router.get('/:gameId', isLoggedIn, gamesCtrl.show)

router.get('/:gameId/comments/:commentId/edit', isLoggedIn, gamesCtrl.editComment)

router.put('/:gameId/comments/:commentId', isLoggedIn, gamesCtrl.updateComment)

router.delete('/:gameId/comments/:commentId', isLoggedIn, gamesCtrl.deleteComment)

export {
	router
}