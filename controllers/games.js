import { Game } from "../models/game.js"


function newGame(req, res){
  res.render('games/new', {
    title: "Add Game to List",
  })
}

function create(req, res){
  req.body.owner = req.user.profile._id
  req.body.completed = !!req.body.completed
  Game.create(req.body)
  .then(game =>{
    res.redirect('/games/')
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/games/')
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

function show(req, res) {
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(game => {
    res.render('games/show', { 
      title: 'Game Detail', 
      game: game,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteGame(req, res){
  Game.findByIdAndDelete(req.params.gameId)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

function edit(req, res){
  Game.findById(req.params.gameId)
  .then(game =>{
    res.render('games/edit', {
      game,
      title: 'edit game'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}


function addComment(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    req.body.author = req.user.profile._id
    game.comments.push(req.body)
    game.save()
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/games')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function showComment(req, res) {
  Game.findById(req.params.gameId)
  .populate([
    {path: "owner"},
    {path: "comments.author"}
  ])
  .then(game => {
    res.render('games/show', {
      title: "show",
      game
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/tacos')
  })
}

function editComment(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const comment = game.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      res.render('games/editComment', {
        game, 
        comment,
        title: 'Update Comment'
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function updateComment(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const comment = game.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/games')
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function deleteComment(req,res){
  Game.findById(req.params.gameId)
  .then(game =>{
    const comment = game.comments.id(req.params.commentId)
    if(comment.author.equals(req.user.profile._id)) {
      game.comments.remove(comment)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/games')
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

export{
  newGame as new,
  create,
  index,
  show,
  deleteGame as delete,
  edit,
  addComment,
  showComment,
  editComment,
  updateComment,
  deleteComment
}