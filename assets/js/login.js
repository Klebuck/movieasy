// Initialize Firebase
var usuarioLogueado="";
var rutaFoto=""

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

//Autenticación para hacer uso del storage
var authService = firebase.auth();
//Base de datos de imagenes
var dbFotos = firebase.storage();

 

$(document).ready(function(){

// realizamos la autenticación anónima (debe estar activada en la consola de Firebase)
  authService.signInAnonymously()
    .catch(function(error) {
      console.error('Detectado error de autenticación', error);
    });

  // asociamos el manejador de eventos sobre el INPUT FILE
    document.getElementById('foto').addEventListener('change', function(evento){
    evento.preventDefault();
    //Obteniendo el nick del input del formulario
    var nickName = $("#nick").val();
    //Creando una variable archivo para guardar la foto temporalmente
    var archivo  = evento.target.files[0];
    //Subir archivo con la foto y el nombre del usuario
    subirArchivo(archivo,nickName);
  });

	$("#btn-login").click(function(){
		
		//Función ingresar usuario y contraseña
		var usuarios = db.ref('usuarios');
		usuarios.on('value',function(ss){
			var usuario = ss.val();
		// Suiche que me indica si encontre el correo y la clave en caso de encontrarlo cambia valor de 0 a 1
			var logeado = 0;
			usr = Object.keys(usuario);
           for(i=0; i<usr.length; i++){
           	console.log(usuario)
            if(usuario[usr[i]].correo == $("#correoLog").val() && usuario[usr[i]].clave == $("#claveLog").val())
            	{
                alert('entrando');
                  //VARIABLE DE SESION PARA GUADRA EL NICK
                 sessionStorage['usuarioLogueado'] = usr[i];
                 logeado=1
           	  }	
            }
            if(logeado == 1){
              document.location.replace('perfil.html')
              //cargaDatos();
            }else 
              {
                $('#mensajeUsuario').text('"Ese usuario no existe o la contraseña esta incorrecta"', 3000, 'rounded');
                
            }
	    })
   })

// Rescatar información del formulario crear perfil
	$('#btn-sign-up').click(function(){
// haciendo referencia a el campo usuarios de la base de datos
	  var usuarios = db.ref('usuarios');
     
      var nick = $('#nick').val();
      var nombre = $('#nombre').val();
      var correo = $('#correo').val();
      var clave = $('#clave').val();
  
// Creo un objeto para almacenar los datos de un usuario
      var usuario = new Object();
      usuario.nick=nick;
      usuario.nombre=nombre;
      usuario.correo = correo;
      usuario.clave= clave;
      usuario.foto=rutaFoto;
//Llamo al campo referencia de usuarios de la base de datos que es nick 
// Guardo con set el objeto usuario con todos los datos de los usuarios

      usuarios.child(nick).set(usuario);
      sessionStorage['usuarioLogueado'] = nick;
      alert('usuarios registrado con exito')
      document.location.replace('perfil.html')
      //cargaDatos();
    })
  
});


// función que se encargará de subir el archivo
    function subirArchivo(archivo, nick) {
      // creo una referencia/ruta/carpeta/repositorio al lugar donde guardaremos el archivo
      var rutaServer = dbFotos.ref('perfiles').child(nick);
      // Comienzo la tarea de upload/Subiendo la foto
      var uploadTask = rutaServer.put(archivo);
      // defino un evento para saber qué pasa con ese upload iniciado
      uploadTask.on('state_changed', null,
        function(error){
          console.log('Error al subir el archivo', error);
        },
        function(){
          console.log('Subida completada');
          //mensajeFinalizado(uploadTask.snapshot.downloadURL, uploadTask.snapshot.totalBytes);
          //Guardo la ruta donde quedo registrada la foto en el servidor
          //snapshot.downloadURL es el equivalente a ss recasta la foto
          rutaFoto = uploadTask.snapshot.downloadURL
        }
      );
    }

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
