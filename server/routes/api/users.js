const express = require('express');
const Base64 = require('js-base64').Base64;
let User = require ('../../models/user')

const router = express.Router();




//Get Users
router.route('/')
  .get(function (req, res){
    User.find().exec(function(err, results){
      if(err){
        throw err
      }

      res.json(results);
    })
  })

  //Add User
  .post(function(req, res){
    let userData = req.body

    let userObj = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      user: userData.user,
      password: Base64.encode(userData.password),
      address: userData.address,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      photo: userData.photo,
      userID: userData.userID,
      enabled: userData.enabled
    }) 

    userObj.save(function (err) {
      console.log(err)
      if (err) {
        
        if(err.code === 11000){
          res.status(400)
          res.send('El email asociado ya está en uso, pichita mía')
        }

        if(err.code !== 11000){
          throw err
        }
      }
      if(!err){
        res.status(201)
        res.json(userObj.toJSON())

      }

  
    })
  
})

//Delete User
  .delete(function(req, res){
    res.status(403)
    res.send('Que va colega, solo de uno en uno')
  });

//Get User:id
router.route('/:id')
  .get(function (req, res){
    let userId = req.params.id
    User.findById(userId).exec(function(err, result){
      if(err){
        throw err
      }

    if(!result){
      res.status(404)
      res.send('Recurso no encontrado, canijoh')
    }

    if(result){
      let userJSON = result.toJSON()
      //delete userJSON.password //nos sirve para cuando pidamos esta Api no nos salga la contraseña (aunque esté encriptada) 

      res.json(userJSON);
      }
    })
  })

//Put User:id
  .put(function(req, res){
    let UserId = req.params.id
    let userData = req.body

    User.findById(UserId).exec(function(err, result){
      if(err){
        throw err
      }

      if(!result){
        res.status(404)
        res.send('Recurso no encontrado, canijah')
      }

      if(result){
        result.firstName = userData.firstName
        result.lastName = userData.lastName
        result.user = userData.user
        result.email = userData.email
        result.password = Base64.encode(userData.password)
        result.enabled = userData.enabled
        result.address = userData.address
        result.role = userData.role
        result.photo = userData.photo
        //result.userID = userData.userID
        result.phone = userData.phone

        result.save(function(err){
          if(err){
            if(err.code === 11000){
              res.status(400)
              res.send('El email ya está siendo usado por otro colega, inventate otro')
            }
          }

          let userJSON = result.toJSON()
          delete userJSON.password

          if(!err){
            res.json(userJSON)
          }
        })
      }
    })
  })

//Delete User:id
  .delete(function(req, res){
    let UserId = req.params.id

    User.findByIdAndRemove(UserId, function (err, result) {
      if (err) throw err;

      if (!result) {
        res.status(404)
        res.send('Recurso no encontrado')
      }

      if (result) {
        res.status(204)
        res.send('Borrado con exito')
      }

    })
  });

module.exports = router;