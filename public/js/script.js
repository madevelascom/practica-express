$(document).ready(function(){
    cargarProyectos();
});

$("#proyecto").change(function(){
    vaciarContenedores();
    cargarTareasIniciales($(this).val());
    cargarTareasEnDesarrollo($(this).val());
    cargarTareasFinalizadas($(this).val());
})

function cargarTareasIniciales(proyectName){
    $.get("/tareas/initial/" + proyectName, function(data){
        for (i=0; i<data.length; i++){
            var $row = $('<div>',  {class: 'row text-left pt-10'});
            var $name = $('<div>', {class: 'col-md-11'}).html(data[i].titulo);
            var $button = $('<button>', {class: 'btn'}).html('&times;');
            $row.append($name);
            $row.append($button);
            $('#estadoInicial').append($row);
        }
    });
}

function cargarTareasEnDesarrollo(proyectName){
    $.get("/tareas/developing/" + proyectName, function(data){
        for (i=0; i<data.length; i++){
            var $row = $('<div>',  {class: 'row text-left pt-10'});
            var $name = $('<div>', {class: 'col-md-11'}).html(data[i].titulo);
            var $button = $('<button>', {class: 'btn'}).html('&times;');
            $row.append($name);
            $row.append($button);
            $('#estadoEnDesarrollo').append($row);
        }
    });
}

function cargarTareasFinalizadas(proyectName){
    $.get("/tareas/finished/" + proyectName, function(data){
        for (i=0; i<data.length; i++){
            var $row = $('<div>',  {class: 'row text-left pt-10'});
            var $name = $('<div>', {class: 'col-md-11'}).html(data[i].titulo);
            $row.append($name);
            $('#estadoFinalizadas').append($row);
        }
    });
}

function vaciarContenedores(){
    $('#estadoInicial').empty();
    $('#estadoEnDesarrollo').empty();
    $('#estadoFinalizadas').empty();
}

function cargarProyectos(){
    $.get("/proyectos", function(data){
        for (i=0; i<data.length; i++){
            var nombre = data[i].nombre;
            $("#proyecto").append("<option>"+nombre+"</option>");
        }
    });
}

function eliminarTarea(){
    tarea = $("jqueryParaNombreDeTarea");
    proyecto = $("#proyecto");

}

$(function(){

    $("#resp").autocomplete({
    	source: function(req, resp){
            $.ajax({
                method: "GET",
                url: "/users",
                dataType: "json",
                data: {
                    term: req.term
				},
                success: function( data ) {
                    console.log(data)
                    resp( data );
                }
            });
        }
	});
});

function agregarTarea(){
    data = {
        titulo: $("#title").val(),
        descripcion : $("#descrip").val(),
        responsable : $("#resp").val(),
        estado : 1,
        proyecto: $("#proyecto").val()
    }
    $.ajax({
        type: "POST",
		url: "/tareas",
		data: data,
		success: function(){
            alert("Tarea Creada Con Exito");
		},
		dataType: "jsonp"
	})
}