const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName: {type: String, required: false, default: "Benito"},
    lastName: {type: String, required: false, default: "Camela"},
    user: {type: String, required: true, default: "Anonymous"},
    password: {type: String, required: true},
    address: {type: String, required: false, default: "Calle falsa 1,2,3"},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: false, default: 666},
    role: { type: String, required: false, default: 'Default'},
    photo: {type: String, required: false, default: "No photo"},
    userID: { type: String, required: false},
    enabled: {type: Boolean, required: false, default: false},
    logged_at: {type: Date, required: false}
  }, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

// userSchema.virtual('fullname').get(function(){
//   let fullnameStr = (this.firstName + ' ' + this.lastName).trim();
//   return fullnameStr
// });

userSchema.set('toJSON', {getters: true, virtuals: false});

let UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;