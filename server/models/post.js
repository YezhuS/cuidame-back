const mongoose = require('mongoose')

const Schema = mongoose.Schema
const postSchema = new Schema({
    title: {type: String, required: true},
    user: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    place: {type: String, required: true},
    enabled: {type: Boolean, required: false, default: false}
  }, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

postSchema.set('toJSON', {getters: true, virtuals: false});

let PostModel = mongoose.model('Posts', postSchema);

module.exports = PostModel;