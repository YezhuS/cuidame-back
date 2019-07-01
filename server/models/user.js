const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    // firstName: {type: String, required: false},
    // lastName: {type: String, required: false},
    user: {type: String, required: false, default: "Anonymous"},
    password: {type: String, required: false},
  //  address: {type: String, required: false},
    email: {type: String, required: false, unique: false},
    // phone: {type: Number, required: false},
    // role: { type: String, required: false, default: 'Default'},
    // photo: {type: String, required: false },
    // userID: { type: String, required: false},
    // enabled: {type: Boolean, required: false, default: false}
    //logged_at: {type: Date, required: false}
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