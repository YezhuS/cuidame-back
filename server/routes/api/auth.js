const express = require('express')
const Base64 = require('js-base64').Base64;
const User = require('../../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const randtoken = require('rand-token')

// let refreshTokens = {}
let SECRET = "SECRETO_PARA_ENCRIPTACION"

//signUp
// router.route('/signUp')
//   .post(function(req, res) {
//     let userData = req.body
//     console.log(user.data)
//     let newUser = new User({
//       email: userData.email,
//       password: Base64.encode(userData.password)
//     })
//     newUser.save(err => {
//       if (err) {
//         res.status(400)
//         res.send('Algo falló, amigo') 
//         } 
//         if(!err){
//           res.status(201)
//       jwt.sign(newUser, SECRET , {expiresIn: '30d'}, (err, token) => {
//         res.json({token: token})
//       })
//         }
//     })
//   })

//login
router.route('/login')
  .post(function (req, res) {
    let userData = req.body

    User.findOne({
      email: userData.email,
      password: Base64.encode(userData.password)
      //enabled: true
    }).exec(function (err, result) {
      if (err) {
        throw err
      }

      if (!result) {
        res.status(403)
        res.send("Usuario o contraseña incorrecto")
      }

      if (result) {
        let userJSON = {
          id: result._id,
          firstname: result.firstname,
          lastname: result.lastname,
          role: result.role
        }

        let jwtToken = generateToken(userJSON, SECRET)

        // let jwtToken = jwt.sign(userJSON, SECRET, {expiresIN: 300})
        // let refreshToken = randtoken.uid(256)
        // refreshTokens[refreshTokens] = userData.email res.json({token: 'JWT' + token, refreshToken: refreshToken})

        //result.logged_at = Date.now()
        //result.save()

        res.json({token: jwtToken})
      }
    })

  })

router.route('/')
  .get((req, res) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      User.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            email: user.email,
            //name: user.name
          }
        })
      })
  
    })
  })

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


function generateToken(payload, secret_passphrase) {
  return jwt.sign(payload, secret_passphrase, {
    expiresIn: "30 days"
  });
}

module.exports = router;
