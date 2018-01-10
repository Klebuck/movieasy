// Initialize Firebase
var usuarioLogueado="";

var config = {
    apiKey: "AIzaSyDGtZ_xGNto5YRyJ0UyjFpvTfZEeoGM3FA",
    authDomain: "travel-a3801.firebaseapp.com",
    databaseURL: "https://travel-a3801.firebaseio.com",
    projectId: "travel-a3801",
    storageBucket: "travel-a3801.appspot.com",
    messagingSenderId: "679853152568"
  };
firebase.initializeApp(config);
var db = firebase.database();

/*var ref = db.ref('clark');
ref.on('value',function(ss){
/ //console.log(usuario);
 document.getElementById('newClave').innerHTML=usuario.clave;
 document.getElementById('newNombre').innerHTML=usuario.nombre;
 document.getElementById('newCorreo').innerHTML=usuario.correo;

});*/

  //crearUsuario('clark','Jesus Manrique','manriquej@gmail.com');
  //crearUsuario('gaby','Gabriela Castillo','castillg@gmail.com');

$(document).ready(function(){

	$("#btn-login").click(function(){
		
		//Función ingresar usuario y contraseña
		var usuarios = db.ref('usuarios');
		usuarios.on('value',function(ss){
			var usuario = ss.val();
		// Suiche que me indica si encontre el correo y la clave en caso de encontrarlo cambia valor de 0 a 1
			var logeado = 0;
			usr = Object.keys(usuario);
            for(i=0; i<usr.length; i++){
            	if(usuario[usr[i]].correo == $("#email").val() && usuario[usr[i]].clave == $("#password").val())
            	{
                  //VARIABLE DE SESION PARA GUADRA EL NICK
                  sessionStorage['usuarioLogueado'] = usr[i];
                  logeado=1
            	}	
            }
            if(logeado == 1){
              document.location.replace('post.html')
              Materialize.toast('Inicio de sesion exitoso', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
        
            }else 
              {
                Materialize.toast('"Ese usuario no existe o la contraseña esta incorrecta"', 3000, 'rounded');
                
            }
	    })
    })

	// Rescatar inormación del formulario crear perfil
	$('#btn-sign-up').click(function(){
 // haciendo referencia a el campo usuarios de la base de datos
	  var usuarios = db.ref('usuarios');
     
      var nick = $('#nick').val();
      var nombre = $('#nombre').val();
      var email = $('#correo').val();
      var nacionalidad = $('#nacionalidad').val();
      var clave = $('#clave').val();
  //var password2 = $('#password2').val();
  // Creo un objeto para almacenar los datos de un usuario
      var usuario = new Object();
      usuario.nombre=nombre;
      usuario.correo = email;
      usuario.nacionalidad= nacionalidad;
      usuario.clave= clave;
//llamo al campo referencia de usuarios de la base de datos que es nick 
// guardo con set el objeto usuario con todos los datos de los usuarios
      usuarios.child(nick).set(usuario);

      document.location.replace('post.html')

    })
 $('#modal1').modal();
  
})    

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
                $('#nombre').text(usuario[usr[indice]].nombre);
                 $('#nac').text(usuario[usr[indice]].nacionalidad);

                
          })

    }

/* //Llamanso al modal de registro de usuario
$(document).ready(function(){
   
  });

 */