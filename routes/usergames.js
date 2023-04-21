import { Router } from 'express'
import * as userGamesCtrl from '../controllers/usergames.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, userGamesCtrl.index)


router.get('/new', isLoggedIn, userGamesCtrl.new)

router.post('/', isLoggedIn, userGamesCtrl.create)




export {
  router
}