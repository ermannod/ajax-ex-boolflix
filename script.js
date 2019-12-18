$(document).ready(function(){
  var source   = $("#movie-template").html();
  var template = Handlebars.compile(source);

  $("#search").keypress(function(event){
    var searched = $('#search').val();
    console.log(searched);
    if ( event.which == 13 && searched.length != "") {
      $(".movzone").empty();
      $('#search').val("");
      searchBar(searched);

    }; //end event.which == 13
  });// end #mynewmess keypress



  function searchBar(searched){
    $.ajax({
      url : "https://api.themoviedb.org/3/search/movie",
      data : {
          api_key: "17db77d73e25bc0f6727d462a5bc017f",
          query : searched,
          language : "it-IT"
      },
      method : "GET",
      success : function (data) {
        var movie_array = data.results;
        addSearched(movie_array);
      },
      error : function (error) {
          alert(error);
      }
    }); // end Ajax movieOri
    $.ajax({
      url : "https://api.themoviedb.org/3/search/tv",
      data : {
          api_key: "17db77d73e25bc0f6727d462a5bc017f",
          query : searched,
          language : "it-IT"
      },
      method : "GET",
      success : function (data) {
          var serie_array = data.results;
          addSearched(serie_array);
      },
      error : function (error) {
          alert(error);
      }
    }); // end Ajax series
  }; // end searchBar

  function addSearched(results){
    for (var i = 0; i < results.length; i++) {
      var current = results[i];
      if (current.hasOwnProperty("title")) {
        var movie = current.title;
        var type = "movie";
      } else {
        var movie = current.name;
        var type = "serie";
      }
      if (current.hasOwnProperty("title")) {
        var movieOrig = current.title;
        var type = "Movie";
      } else {
        var movieOrig = current.name;
        var type = "Serie";
      }
      var lang = current.original_language;
      var stars = (current.vote_average / 2);
      var context =
        {
          type : type,
          title: movie,
          originalTitle: movieOrig,
          language: flags(lang),
          stars: starIcon(ranking_stars(stars))
        };
      var html = template(context);
      $(".movzone").append(html).show();
      }
    }


  function ranking_stars(star){
    var rank5 = Math.ceil(star / 2);
    return rank5;
  }; // end ranking_stars

  function starIcon(icons){
    var iconStar = "";
    for (var i = 0; i < 5; i++) {
      if (i < icons) {
        iconStar += "<i class='fas fa-star'></i>";
      } else {
        iconStar += '<i class="far fa-star"></i>';
      }
    }; // end if
    return iconStar;
  }; // end starIcon function

  function flags(langcode){
    var countryLang = "";
    if (langcode == "fr" || langcode == "en") {
      countryLang = '<img src="flags/' + langcode + '.png">'
    } else {
      countryLang = langcode
    }; // end if

    return countryLang;
  } // end flags


}); // End Dom
