const Thing = require('../models/thing');

const fs = require('fs');
const thing = require('../models/thing');


exports.creerObjet = (req,res,next) => {
    const thingObjet = JSON.parse(req.body.thing);
    delete thingObjet._id;
    const thing = new Thing({...thingObjet,
      imageUrl : `${req.protocol}://${req.get('host')}/imag,es/${req.file.filename}`});
    thing.save()
    .then(() => res.status(201).json({ message : 'Objet enregistre'}))
    .catch(() => res.status(400).json( {error}));
  };

  
  
  exports.deleteThing = (req,res, next) =>{
    Thing.findOne({_id : req.params.id})
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id : req.params.id})
      .then(() => res.status(200).json({ message : 'Objet Supprime'}))
      .catch( error => res.status(400).json({ error }));  
      })
    })
    .catch(error => res.status().json({error}));
    
  };



  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
  };



  exports.getAllStuff = (req, res, next) => {
    Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({error}));
    
};



exports.modifyThing = (req, res, next) => {
  const thingObjet = req.file ? {
      ...JSON.parse(req.body.thing),
      imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } 
  : {
    ...req.body
  };
    Thing.updateOne({ _id : req.params.id}, { ...thingObjet, _id : req.params.id})
    .then( () => res.status(201).json({ message : 'Objet Modifie'}))
    .catch()
};

