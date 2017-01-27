var express = require('express');
var router = express.Router();
var Proyecto = require('../models/proyectos');
var Tarea = require('../models/tareas');

router.post('/', function(req, res, next){
    var tarea = new Tarea({titulo : req.body.titulo , descripcion : req.body.descripcion , responsable : req.body.responsable , estado : 1 , proyecto : "588ac31b793b62329486106d"});

    tarea.save(function(err){
        if (err) return handleError(err);
    });
    res.send("Tarea Guardada Con Exito")
});

router.delete('/:idTarea', function(req, res, next){
    var id = req.params.idTarea;
    Tarea.remove({
        titulo: id
    });
    tarea.save(function(err){
        if (err) return handleError(err);
    });
    res.send("Tarea Guardada Con Exito")
});

module.exports = router;
