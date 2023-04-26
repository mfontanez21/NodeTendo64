import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  if (req.user){
    res.redirect('/games')
  } else {
    res.render('index', { title: 'NodeTendo 64' })
  }
})


export {
  router
}
