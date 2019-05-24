import mongoose from 'mongoose'
import 'mongoose-type-email'

export default mongoose.model('User', new mongoose.Schema({
  address: { type: String, unique: true },
  email: { type: mongoose.SchemaTypes.Email, index: true },
  firstName: String,
  lastName: String,
  github: String,
  twitter: String,
  token: String,
  tokenCreatedAt: Date,
}, { timestamps: true }))
