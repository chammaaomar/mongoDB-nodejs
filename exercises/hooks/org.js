const mongoose = require('mongoose')
const Project = require('./project')
const cdnUrl = 'https://cdn.adminapp.com'

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'trialing', 'overdue', 'canceled']
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
})
// asynchronous middleware / hook
// it is somewhat like decoration in Python
orgSchema.post('remove', async function() {
   await Project.deleteMany({org: this._id});
})

orgSchema.virtual('avatar', function() {
    return `${cdnUrl}/${this.name}`;
})

module.exports = mongoose.model('org', orgSchema)
