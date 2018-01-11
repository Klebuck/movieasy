$(document).ready(function(){
  
  console.log("listo");

  $('#searchForm').click(function(){
    var text = $("#searchText").val();
    $("#searchText").val('');
    getMovies(text);
  });



}); // ready



function getMovies(text){
  $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&s=' + encodeURI(text)).then(function(dataMovies){  
    var searchArr = dataMovies.Search;
    console.log(searchArr);
    for (var i in searchArr){
    var movieTitle = searchArr[i].Title;
    var moviePoster = searchArr[i].Poster;
    var movieID = searchArr[i].imdbID;
    $('#movies').append('<div class="col-lg-3"><div class="altura"><img src="' + moviePoster + '"><h3>' + movieTitle+ '</h3><button class="moviepage" value="' + movieID + '" href="#">Detalles</button></div></div>');
    };//for

 $('.moviepage').click(function(){
    var imdb = $(this).val();
    console.log(imdb);
     $.getJSON('https://www.omdbapi.com/?apikey=3a181f1c&i=' + encodeURI(imdb)).then(function(singleMovie){
        console.log(singleMovie);
     });

    
  });//funcion sinlglepage


  });//llamada 1

};//funcion








