var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	var usuario = new Usuario({ nombre : "pedro senseto"});

	usuario.save(function(){
		res.send("guardado con exito");
	});
  
});

module.exports = router;
