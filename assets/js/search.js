$(document).ready( function(){

$('#enviar_peli').click(function(){
var pelicula = $('#new_pelicula').val();
apiCallPel(pelicula);
});

$('#enviar_peli_all').click(function(){
var pelicula = $('#peli_all').val();
apiCallAll(peli_all);

});

});


/* 
 * Aqui estamos consultando las peliculas por sus titulos
 * La t al final de la clave key significa titulo
 * Le asignamos la variable pelicula que es la que tiene el valor
 * ingresado por el usuario en la caja de texto
 */
function apiCallPel(pelicula){
 $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&t=' + encodeURI(pelicula)).then(function(response){	
	//return response.Language
    console.log(response.Language);
 });
   
};

/*
* Aqui utilizamos la s al final de la clave de key
* el mismo nos trae todo los datos
* combinamos la s con 
  */
//function apiCallAc(actor){
 //$.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&s=' + encodeURI(actor)).then(function(response){
 	//image =response.Poster;
 //	console.log(response);
 //});

//}


/* Combinación de busqueda */
function apiCallAll(peli_all){
$.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&s=' + encodeURI(peli_all)).then(function(response){
 	var resultado=""
 	resultadoArreglo=response.Search; //El arreglo de peliculas obtenido
    for (var i=0; i<resultadoArreglo.length;i++) {   // recorrer el arreglo de peliculas
	    lenguaje = apiCallAll(resultadoArreglo[i].Title); //buscar el titulo de la pelicula para sacar el lenguaje
        //como esperar que se ejecute la funcion para leer el resultado???
        resultado += resultadoArreglo[i].Title+ " : "+lenguaje + "\n"; 
	}
    console.log(resultado)
 });

    
}