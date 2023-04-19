import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()


// GET /movies/new
router.get('/new', gamesCtrl.new)

// POST /movies
router.post('/', gamesCtrl.create)

// GET games/index
router.get('/', gamesCtrl.index)

router.get('/:gameId', gamesCtrl.show)

// localhost:3000/games/:gameId
router.delete("/:gameId", gamesCtrl.delete)

export {
	router
}