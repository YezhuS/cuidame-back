const express = require('express');
let Post = require ('../../models/post')

const router = express.Router();




//Get Posts
router.route('/')
  .get(function (req, res){
    Post.find().exec(function(err, results){
      if(err){
        throw err
      }

      res.json(results);
    })
  })

  //Add Post
  .post(function(req, res){
    let postData = req.body

    let postObj = new Post({
      title: postData.title,
      user: postData.user,
      type: postData.type,
      description: postData.description,
      place: postData.place,
      enabled: postData.enabled
    }) 

    postObj.save(function (err) {
      if (err) {
        throw err
      }

    res.status(201)
    res.json(postObj.toJSON())
  })
})

//Delete Post
  .delete(function(req, res){
    res.status(403)
    res.send('No se puede borrar a lo loco, de uno en uno colega')
  });

//Get Post:id
router.route('/:id')
  .get(function (req, res){
    let postId = req.params.id
    Post.findById(postId).exec(function(err, result){

    if(!result){
      res.status(404)
      res.send('Recurso no encontrado, canijoh')
    }

    if(result){
        if(err){
          throw err
        }

        res.json(result.toJSON());
      }
    })
  })

//Put Post:id
  .put(function(req, res){
    let postId = req.params.id
    let postData = req.body

    Post.findById(postId).exec(function(err, result){
      if(err){
        throw err
      }

      if(!result){
        res.status(404)
        res.send('Recurso no encontrado, canijah')
      }

      if(result){
        result.title = postData.title,
        result.user = postData.user,
        result.type = postData.type,
        result.description = postData.description,
        result.place = postData.place,
        result.enabled = postData.enabled

        result.save(function(err){
          if(err){
            throw err
          }

          res.json(result.toJSON())
        })
      }
    })
  })

//Delete Post:id
  .delete(function(req, res){
    let postId = req.params.id

    Post.findByIdAndRemove(postId, function (err, result) {
      if (err) throw err;

      if (!result) {
        res.status(404)
        res.send('Recurso no encontrado')
      }

      if (result) {
        res.status(204)
        res.send('Borrado con éxito')
      }

    })
  });


module.exports = router;