var config = {
    apiKey: "AIzaSyCXbwKuVGx-iGeSPMp8tetJORIthSMYbRk",
    authDomain: "movie-dc30f.firebaseapp.com",
    databaseURL: "https://movie-dc30f.firebaseio.com",
    projectId: "movie-dc30f",
    storageBucket: "movie-dc30f.appspot.com",
    messagingSenderId: "294137075020"
  };
firebase.initializeApp(config);
var db = firebase.database();

var titulo="";

$(document).ready(function(){
     cargaDatos();

     $('#cerrar_sesion').click(function(){
       sessionStorage['usuarioLogueado'] = "";
        document.location.replace('index.html')
     })

     $('#buscar_peli').click(function(){
        document.location.replace('resultados.html')
     })

     $('#peli_buscar').click(function(){
       pelicula = $('#buscar_pelicula').val();
       consulta(pelicula);
     })

});


function cargaDatos(){
       //console.log("Usuario: "+sessionStorage['usuarioLogueado']) 

        var usuarios = db.ref('usuarios');
        usuarios.on('value',function(ss){
          var usuario = ss.val();
          var indice=0;
          usr = Object.keys(usuario);
                for(i=0; i<usr.length; i++){
                  if(usr[i] == sessionStorage['usuarioLogueado'])
                  {
                      indice = i;
                  } 
                }
                //console.log(usuario[usr[indice]].correo)
                $('#nombreUsuario').text(usuario[usr[indice]].nombre);
               // $('#nickName').text(usr[indice]);
                $('#fotoPerfil').attr('src',usuario[usr[indice]].foto)
          })
    }

    //Función para buscar pelicula individual
    function consulta(pelicula){
    $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&t=' + encodeURI(pelicula)).then(function(response){   
   console.log(response);
  $('#consulta_pelicula').append('<div class="row character">' +
    '<div class= "col-md-4 ">'+
     '<img class= "imagen_poster" src="' + response.Poster + '">'+
    '</div>' +
    '<div class= "col-md-8 text-left">'+
    '<p class="form-control pl-2 pr-2">Titulo: ' + response.Title + '</p>' +
    '<p class="form-control pl-2 pr-2">Idioma: ' + response.Actors + '</p>' +
    '<p class="form-control pl-2 pr-2">Idioma: ' + response.Language + '</p>' +
    '<p class="form-control pl-2 pr-2">Categoría: ' + response.Genre + '</p>' +
    '<div class="row character">' +
    '<div class= "col-md-3 col-md-push-2 ">'+
    '<button  type="button" class="favoritos btn btn-dark ingresar">Favoritos</button>' +
    '</div>' +
    '<div class= "col-md-2 ">'+
    '<button  type="button" class="visto btn btn-dark ingresar">Vistos</button>' +
    '</div>' +
    '<div class= "col-md-2 col-md-pull-3 ">'+
    '<button  type="button" class="ver btn btn-dark ingresar">Ver</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>')
  //Le asigno el valor de response.Title a la variable titulo que esta declarada arriba
     titulo=response.Title
    $('.favoritos').click(function(){
       favoritos(titulo);
     })

    $('.visto').click(function(){
       vistos(titulo);
     })

    $('.ver').click(function(){
       ver(titulo);
     })

    });
   
  }
 //new_favorito es el parámetro que recibe la variable titulo
  function favoritos(new_favorito) {
 $('#lis_favoritos').append('<div class="row character">' +
    '<div class= "col-lg-12">'+
    '<p id="pelicula_fav"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp&nbsp' + new_favorito + '</p>' +
    '</div>' +
    '</div>')

 //$('.fa fa-trash').click(function(){
   //    $('#pelicula_fav').remove();
     //})   

}

function vistos(new_visto) {
 $('#lis_visto').append('<div class="row character">' +
    '<div class= "col-lg-6">'+
    '<p class="list-group-item"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>&nbsp&nbsp' + new_visto + '</p>' +
    '</div>' +
    '</div>')

}

function ver(new_ver) {
 $('#lis_ver').append('<div class="row character">' +
    '<div class= "col-lg-6">'+
    '<p class="list-group-item"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>&nbsp&nbsp' + new_ver + '</p>' +
    '</div>' +
    '</div>')

}

  
    