import { UserGame } from '../models/usergame.js'
import { Game } from '../models/game.js'

function index(req, res) {
  UserGame.find({owner: req.user.profile._id})
  .then(usergames => { 
    res.render('usergames/index', {
      usergames,
      title: 'All Your Games',
      type: req.params.sorttype
    })
  })
  .catch(error => { 
    console.log(error)
    res.redirect('/usergames/index')
  })
}

function update(req, res) {
  UserGame.findById(req.params.usergameId)
  .then(usergame => {
    if (usergame.owner.equals(req.user.profile._id)) {
      req.body.completed = !!req.body.completed
      usergame.updateOne(req.body)
      .then(()=> {
        res.redirect(`/usergames/${usergame._id}`)
        console.log(req.body);
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/usergames`)
  })
}

function newUserGame(req, res) {
  UserGame.find({owner: req.user.profile._id})
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


function addGameToList(req, res) {
  Game.findById(req.body.game)
  .then(game =>{
    req.body.owner = req.user.profile._id
    req.body.game = game._id
    req.body.title = game.title
    req.body.releaseYear= game.releaseYear
    req.body.imgName = game.imgName
    UserGame.create(req.body)
    .then(usergame =>{
      res.redirect('/usergames/')
    })
    console.log(req.body);
    console.log();
  })
}

function show(req, res) {
  UserGame.findById(req.params.usergameId)
  .populate('owner')
  .then(usergame => {
    res.render('usergames/show', { 
      title: 'Game Detail', 
      usergame: usergame,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteGame(req, res){
  UserGame.findByIdAndDelete(req.params.usergameId)
  .then(usergame => {
    if(usergame.owner.equals(req.user.profile._id)) {
      usergame.deleteOne()
      .then(()=>{
        res.redirect('/usergames')
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
  }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

function edit(req, res){
  UserGame.findById(req.params.usergameId)
  .then(usergame =>{
    res.render('usergames/edit', {
      usergame,
      title: 'edit game'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/usergames")
  })
}


function addComment(req, res) {
  UserGame.findById(req.params.usergameId)
  .then(usergame => {
    req.body.author = req.user.profile._id
    usergame.comments.push(req.body)
    usergame.save()
    .then(()=> {
      res.redirect(`/usergames/${usergame._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/usergames')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/usergames')
  })
}

function showComment(req, res) {
  UserGame.findById(req.params.gameId)
  .populate([
    {path: "owner"},
    {path: "comments.author"}
  ])
  .then(game => {
    res.render('usergames/show', {
      title: "show",
      usergame
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/usergames')
  })
}

function editComment(req, res) {
  UserGame.findById(req.params.usergameId)
  .then(usergame => {
    console.log(req.params.gameId);
    const comment = usergame.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      res.render('usergames/editComment', {
        usergame, 
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
  UserGame.findById(req.params.usergameId)
  .then(usergame => {
    const comment = usergame.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      usergame.save()
      .then(() => {
        res.redirect(`/usergames/${usergame._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/usergames')
      })
    } else {
      throw new Error('🚫 I cant let you do that Star Fox 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/usergames')
  })
}

function deleteComment(req,res){
  UserGame.findById(req.params.usergameId)
  .then(usergame =>{
    const comment = usergame.comments.id(req.params.commentId)
    if(comment.author.equals(req.user.profile._id)) {
      usergame.comments.remove(comment)
      usergame.save()
      .then(() => {
        res.redirect(`/usergames/${usergame._id}`)
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
    res.redirect('/usergames')
  })
}


function sort(req, res){
  UserGame.find({})
  .sort(req.params.sorttype)
  .then(usergames => {
    res.render('usergames/index', {
      usergames,
      title: 'My Game List',
      type: req.params.sorttype 
    })
  } )
  .catch(err => {
    console.log(err)
    res.redirect('/usergames')
  })
}


export {
  newUserGame as new,
  index,
  addGameToList,
  show,
  deleteGame as delete,
  edit,
  addComment,
  showComment,
  editComment,
  updateComment,
  deleteComment,
  update,
  sort,
}