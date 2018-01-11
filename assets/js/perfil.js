/*var config = {
    apiKey: "AIzaSyCXbwKuVGx-iGeSPMp8tetJORIthSMYbRk",
    authDomain: "movie-dc30f.firebaseapp.com",
    databaseURL: "https://movie-dc30f.firebaseio.com",
    projectId: "movie-dc30f",
    storageBucket: "movie-dc30f.appspot.com",
    messagingSenderId: "294137075020"
  };
firebase.initializeApp(config);
var db = firebase.database();
*/

$(document).ready(function(){
     cargaDatos();
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
                $('#nickName').text(usr[indice]);
                $('#fotoPerfil').attr('src',usuario[usr[indice]].foto)
          })
    }