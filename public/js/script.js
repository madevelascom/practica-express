// target elements with the "draggable" class
interact('.draggable')
.draggable({
// enable inertial throwing
inertia: true,
// keep the element within the area of it's parent
/*restrict: {
	endOnly: true,
	elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
},*/
// enable autoScroll
autoScroll: true,

// call this function on every dragmove event
onmove: dragMoveListener,
// call this function on every dragend event
onend: function (event) {
	var textEl = event.target.querySelector('p');

	textEl && (textEl.textContent =
		'moved a distance of '
		+ (Math.sqrt(event.dx * event.dx +
			event.dy * event.dy)|0) + 'px');
}
});

function dragMoveListener (event) {
	var target = event.target,
// keep the dragged position in the data-x/data-y attributes
x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// translate the element
target.style.webkitTransform =
target.style.transform =
'translate(' + x + 'px, ' + y + 'px)';

// update the posiion attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
// enable draggables to be dropped into this
interact('.dropzone').dropzone({
// only accept elements matching this CSS selector
accept: '.yes-drop',
// Require a 75% element overlap for a drop to be possible
overlap: 0.75,

// listen for drop related events:

ondropactivate: function (event) {
// add active dropzone feedback
event.target.classList.add('drop-active');
},
ondragenter: function (event) {
	var draggableElement = event.relatedTarget,
	dropzoneElement = event.target;

// feedback the possibility of a drop
dropzoneElement.classList.add('drop-target');
draggableElement.classList.add('can-drop');
},
ondragleave: function (event) {
// remove the drop feedback style
event.target.classList.remove('drop-target');
event.relatedTarget.classList.remove('can-drop');
},
ondropdeactivate: function (event) {
// remove active dropzone feedback
event.target.classList.remove('drop-active');
event.target.classList.remove('drop-target');
}
});

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
		console.log(data);
		for (i=0; i<data.length; i++){
			if (data[i].estado == 1){
				var $row = $('<div>',  {id: data[i]._id, class: 'row text-left pt-10 draggable drag-drop yes-drop can-drop'});
				var $name = $('<div>', {class: 'col-xs-6'}).html(data[i].titulo);
				var $button = $('<button>', {class: 'btn', 'data-toggle': 'modal', 'data-target': '#deleteTask'}).html('&times;');
				$row.append($name);
				$row.append($button);
				$('#estadoInicial').append($row);
			}

		}
	});
}

function cargarTareasEnDesarrollo(proyectName){
	$.get("/tareas/developing/" + proyectName, function(data){
		for (i=0; i<data.length; i++){
			if (data[i].estado == 2){
				var $row = $('<div>',  {class: 'row text-left pt-10 draggable drag-drop yes-drop can-drop'});
				var $name = $('<div>', {class: 'col-xs-6'}).html(data[i].titulo);
				var $button = $('<button>', {class: 'btn', 'data-toggle': 'modal', 'data-target': '#deleteTask'}).html('&times;');
				$row.append($name);
				$row.append($button);
				$('#estadoEnDesarrollo').append($row);
			}
		}
	});
}

function cargarTareasFinalizadas(proyectName){
	$.get("/tareas/finished/" + proyectName, function(data){
		for (i=0; i<data.length; i++){
			if (data[i].estado == 3){
				var $row = $('<div>',  {class: 'row text-left pt-10 draggable drag-drop yes-drop can-drop'});
				var $name = $('<div>', {class: 'col-xs-6'}).html(data[i].titulo);
				$row.append($name);
				$('#estadoFinalizadas').append($row);
			}
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

function eliminarTarea(id){
	//tarea = $("jqueryParaNombreDeTarea");
	//proyecto = $("#proyecto");
	console.log(id);
	$.ajax({
		type: "DELETE",
		url: "/tareas",
		dataType: "json",
		data: {
			titulo: id
		},
		success: function(){
			alert("Tarea elimnada con exito");
		}
	})

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
		proyecto: $("#proyecto").val(),
		estado: $('#state').val()
	}
	console.log(data);
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

