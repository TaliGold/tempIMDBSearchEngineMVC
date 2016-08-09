requirejs.config( { packages: [
    {
        name: 'text',
        location: '../libs',
        main: 'text'
    }
]});

var onSearchHandler = function(searchTerm){
    requirejs(['search/models/searchModelAndCollection'], function (MovieSearchCollection) {
        var movieSearchCollection = new MovieSearchCollection([], {searchTerm: searchTerm});
        movieSearchCollection.fetch()
            .always(function(){
                presentResultsTable(movieSearchCollection)
            })
    })
};

var presentMovieDetails = function(imdbId){
    requirejs(['movieDetails/models/movieDetailsModel' , 'movieDetails/views/movieDetailsView'], function (MovieDetailsModel , MovieDetailsView) {
        var movieDetailsModel = new MovieDetailsModel({imdbID: imdbId});
        movieDetailsModel.fetch()
            .always(function(){
                var movieDetailsView = new MovieDetailsView({model: movieDetailsModel});
        })

    })

};


var presentResultsTable = function(movieSearchCollection){
    requirejs(['results/views/resultsView'], function (ResultsView) {
        var resultsModel = new Backbone.Model();
        resultsModel.set('moviesSearchCollection', movieSearchCollection);
        var resultsView = new ResultsView({model: resultsModel, onChosenMovieCallback: presentMovieDetails});
    })
};

define(function () {
    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        var searchView = new SearchView({onSearchCallback: onSearchHandler});
    })
})
