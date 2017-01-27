var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuarios');
var Tarea = require('../models/tareas');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var busqueda = req.query.term;
    Tarea.find(function(err, users){
        if (err) {
            res.send(err);
        }
        nombres =[];
        for (i=0; i<users.length; i++) {
        	if ((users[i].responsable).startsWith(busqueda)){
                nombres.push(users[i].responsable);
			}
        }
        uniqueNames = nombres.filter(function(item, pos) {
            return nombres.indexOf(item) == pos;
        });
        res.json(uniqueNames);
    });
	/*
  	var usuario = new Usuario({ nombre : "pedro senseto"});
	usuario.save(function(){
		res.send("guardado con exito");
	});
	*/
});

module.exports = router;
