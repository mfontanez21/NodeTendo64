import { UserGame } from '../models/usergame.js'
import { Game } from '../models/game.js'

function index(req, res) {
  UserGame.find({})
  .then(games => { 
    res.render('usergames/index', {
      games,
      title: 'All Your Games'
    })
  })
  .catch(error => { 
    console.log(error)
    res.redirect('/usergames/index')
  })
}

function newUserGame(req, res) {
  UserGame.find({})
  .populate('games')
  .then(usergames =>{
    Game.find({_id:{$nin: usergames.games} })
    .then(games => {
      res.render('usergames/new', {
      title: "Add Game",
      usergames,
      games,
    })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/usergames")
  })
}

function create(req,res){
  req.body.owner = req.user.profile._id
  UserGame.create(req.body)
  .then(usergame =>{
    res.redirect('/usergames/new')
  })
  .catch(err => {
    res.redirect('/usergames/new')
  })
}




export {
  newUserGame as new,
  create,
  index,
}