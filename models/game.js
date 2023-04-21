import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
})

const gameSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  title: { type: String, required: true},
  releaseYear: { type: Number, required: true, min: 1996, max: 2002},
  imgName: String,
  rating: { type: String, enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']},
  completed: Boolean,
  comments: [commentSchema]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export{
  Game
}