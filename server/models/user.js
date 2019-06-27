const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    user: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: false},
    role: { type: String, required: true, default: 'User'},
    userID: { type: String, required: true},
    enabled: {type: Boolean, required: false, default: false},
    logged_at: {type: Date, required: false}
  }, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

userSchema.virtual('fullname').get(function(){
  let fullnameStr = (this.firstName + ' ' + this.lastName).trim();
  return fullnameStr
});

userSchema.set('toJSON', {getters: true, virtuals: false});

let UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;