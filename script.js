$(document).ready(function(){
  $("#search").keypress(function(event){
    var searched = $('#search').val();
    console.log(searched);
    if ( event.which == 13 ) {
      $.ajax({
        url : "https://api.themoviedb.org/3/search/movie",
        data : {
            api_key: "17db77d73e25bc0f6727d462a5bc017f",
            query : searched,
            language : "it-IT"
        },
        method : "GET",
        success : function (data) {
          if (searched =! "") {
            var movie_array = data.results;
              for (var i = 0; i < movie_array.length; i++) {
                var movie = movie_array[i].title;
                var movieOrig = movie_array[i].original_title;
                var lang = movie_array[i].original_language;
                var stars = movie_array[i].vote_average;

                var source   = $("#movie-template").html();
                var template = Handlebars.compile(source);
                var context =
                  {
                    title: movie,
                    originalTitle: movieOrig,
                    language: lang,
                    stars: stars
                  };
                var html = template(context);
                $(".movzone").append(html).show();
              }
          }
        },
        error : function (error) {
            alert(error);
        }
      }); // end Ajax
    }; //end event.which == 13
  });// end #mynewmess keypress

}); // End Dom
