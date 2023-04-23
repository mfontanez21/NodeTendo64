import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


// GET games/index
router.get('/', isLoggedIn, gamesCtrl.index)


export {
	router
}