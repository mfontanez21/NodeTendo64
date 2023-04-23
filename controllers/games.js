import { Game } from "../models/game.js"


function newGame(req, res){
  res.render('games/new', {
    title: "Add Game",
  })
}

// function create(req, res){
//   req.body.owner = req.user.profile._id
//   req.body.completed = !!req.body.completed
//   Game.create(req.body)
//   .then(game =>{
//     res.redirect('/games/')
//   })
//   .catch(err =>{
//     console.log(err)
//     res.redirect('/games/')
//   })
// }

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