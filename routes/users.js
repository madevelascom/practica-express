var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuarios');
var Tarea = require('../models/tareas');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var busqueda = req.query.term;
    Tarea.find(function(err, tareas){
        if (err) {
            res.send(err);
        }
        nombres =[];
        for (i=0; i<tareas.length; i++) {
        	if ((tareas[i].responsable).startsWith(busqueda)){
                nombres.push(tareas[i].responsable);
			}
        }
        res.json(nombres);
    });
});

module.exports = router;
