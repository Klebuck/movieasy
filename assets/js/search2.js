$(document).ready(function(){
  
  console.log("listo");

  $('#searchForm').click(function(){
    var text = $("#searchText").val();
    $("#searchText").val('');
    $("#portada").hide();
    getMovies(text);
  });
}); // ready

function getMovies(text){
  $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&s=' + encodeURI(text)).then(function(dataMovies){  
    var searchArr = dataMovies.Search;
    $( "#movies" ).empty();
    console.log(searchArr);
    for (var i in searchArr){
    var movieTitle = searchArr[i].Title;
    var moviePoster = searchArr[i].Poster;
    var movieID = searchArr[i].imdbID;
    $('#movies').append('<div class="col-lg-3"><div class="altura"><img src="' + moviePoster + '"><h3>' + movieTitle+ '</h3><button class="moviepage boton" value="' + movieID + '" href="#">Detalles</button></div></div>');
    };//for1
    $('.moviepage').click(function(){
      var imdb = $(this).val();
      $("#movies").empty();
      $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&i=' + encodeURI(imdb)).then(function(singleMovie){
        console.log(singleMovie);
        $('#movies').append('<div class= "col-lg-3 col-md-3 margen"><img class= "imagen_poster" src="' + singleMovie.Poster + '"></div>' + 
    '<div class= "col-md-6 text-left"><div style="margin-bottom: 10px; letter-spacing: 0.3em;">' +
    '<i class="fa fa-star"  style = "color:yellow;" aria-hidden="true"></i><i class="fa fa-star" style = "color:yellow;" aria-hidden="true"></i><i class="fa fa-star" style = "color:yellow;" aria-hidden="true"></i><i class="fa fa-star" style = "color:yellow;" aria-hidden="true"></i></div>' +
    '<p class="pl-2 pr-2" style="color: white;">' + singleMovie.Title + '</p><hr>' +
    '<p class="pl-2 pr-2" style="color: white;">' + singleMovie.Actors + '</p><hr>' + 
    '<p class="pl-2 pr-2" style="color: white;">'+ singleMovie.Lenguage + '</p><hr>' + 
    '<p class="pl-2 pr-2" style="color: white;">' + singleMovie.Genre + '</p><hr>' + 
    '<div class="row character">' +
    '<div class= "col-md-3 col-md-push-2">' +
    '<button  type="button" class="favoritos btn btn-dark ingresar">Favoritos</button></div>' +
    '<div class= "col-md-2 ">' +
    '<button  type="button" class="visto btn btn-dark ingresar">Vistos</button></div>' + 
    '<div class= "col-md-2 col-md-pull-3 ">' + 
    '<button  type="button" class="ver btn btn-dark ingresar">Ver</button>' +
    '</div></div></div></div>'

          );
     });//llamada 2
  });//funcion moviepage
  });//llamada 1
};//funcion getmovies



