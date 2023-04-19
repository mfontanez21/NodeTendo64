import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameSchema = new Schema ({
  title: { type: String, required: true},
  releaseYear: { type: Number, required: true, min: 1996, max: 2002},
  rating: { type: String, enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']},
  completed: Boolean,
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export{
  Game
}