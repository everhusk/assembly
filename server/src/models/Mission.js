import mongoose from 'mongoose'

export default mongoose.model('Mission', new mongoose.Schema({
  title: String,
  description: String,
}, { timestamps: true }))
