import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export default mongoose.model('Project', new mongoose.Schema({
  missions: [{ type: ObjectId, ref: 'Mission' }],
  owner: { type: ObjectId, ref: 'User' },
  title: String,
  description: String,
}, { timestamps: true }))
