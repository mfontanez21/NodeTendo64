import { Game } from "../models/game.js"


function newGame(req, res){
  res.render('games/new', {
    title: "Add Game",
  })
}


function index(req, res) {
  Game.find({})
  .then(games => { 
    res.render('games/index', {
      games,
      title: 'All Games'
    })
  })
  .catch(error => { 
    console.log(error)
    res.redirect('/games/new')
  })
}



export{
  newGame as new,
  index,

}