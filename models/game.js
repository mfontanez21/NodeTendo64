import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  title: { type: String, required: true},
  releaseYear: { type: Number, required: true, min: 1996, max: 2002},
  imgName: String,
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export{
  Game
}