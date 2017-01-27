var express = require('express');
var router = express.Router();
var Proyecto = require('../models/proyectos');
var Tarea = require('../models/tareas');

router.get('/', function(req, res, next) {
    Proyecto.find(function(err, bears){
        if (err){
            res.send(err);
        }
        res.json(bears);
    });
});

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
	//ejemplo consulta
	//refrencia de tarea1 a su padre (obtener el papa) (se usa populate)
	Tarea
	.findOne({ titulo: 'tarea1' })
	.populate('proyecto')
	.exec(function (err, tarea) {
	  if (err) return handleError(err);
	  console.log('El proyecto es %s', tarea.proyecto.nombre);
	  // devuelve el nombre del proyecto
	});




  	

	res.send("todo guardado")
  
});
*/

router.get('/', function(req, res, next) {

	//ejemplo save
	
  	var proyecto = new Proyecto({ nombre : "proyecto1"});
  	
  	proyecto.save(function(err){
  		
  		if (err) return handleError(err);
  		var tarea1 = new Tarea({titulo : "tarea1" , descripcion : "esto es un ejemplo" , responsable : "juanito pelaez" , estado : 1 , proyecto : proyecto._id });
  		var tarea2 = new Tarea({titulo : "tarea2" , descripcion : "esto es un ejemplo 2" , responsable : "juanito pelaez el segundo" , estado : 2 , proyecto : proyecto._id });

  		//setea las tareas como individuales
  		tarea1.save(function(err){
  			if (err) return handleError(err);
  		});

  		tarea2.save(function(err){
  			if (err) return handleError(err);
  		});

  		res.send("guardados proyectos y tareas bien");


  	});
  	

	

	//ejemplo del update
	/*
  	Tarea.update({ titulo: "tarea1" }, { $set: { descripcion: 'haciendo un cambio o que hace' }}, function(err){
  		if (err) return handleError(err);
  		res.send("update hecho")
	});
	*/
});


module.exports = router;
