var express = require('express');
var router = express.Router();


var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Clinic';
var mongodb = require('mongodb');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('patients');
});

router.post('/save', function (req, res, next) {
  let form = req.body;
  console.log(form)
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Clinic');
    dbo.collection('patients').insertOne(form, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    });

  });
});

router.get('/list', (req, res) => {
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    
    if (err) throw err;
    let dbo = db.db('Clinic');
    dbo.collection('patients').find().toArray((err, result) => {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });

});


router.delete('/delete/:id', (req, res) => {
   console.log("delete")
  let id = req.params.id;
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {

    if (err) throw err;
    let dbo = db.db('Clinic');
    let idToDelete = {
      _id: mongodb.ObjectId(id)
    };
    dbo.collection('patients').deleteOne(idToDelete, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    });
  });

});

router.put('/update/:id', (req, res) => {
  console.log("update")
  let form = req.body;
  let id = req.params.id;
  console.log(id)
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Clinic');
    let idtoupDate = { _id: new mongodb.ObjectId(id) }
    let formtoUpdate = { $set: form };
    dbo.collection('patients').updateOne(idtoupDate, formtoUpdate, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    })


  });

});
router.get('/search/:term', (req, res) => {

  let term = req.params.term;
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Clinic');
    let query = {name:new RegExp(term, 'i')};
      dbo.collection('patients').find(query).toArray((err, result) => {
      if(err) throw err;
      db.close();
      res.json(result);
    })
  });


});



module.exports = router;
