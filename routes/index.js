import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'NodeTendo 64' })
})

export {
  router
}
