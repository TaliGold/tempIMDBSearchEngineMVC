requirejs.config( { packages: [
    {
        name: 'text',
        location: '../libs',
        main: 'text'
    }
]});

var resultsView;
var movieDetailsView;
var holdMovieName;


var onSearchHandler = function(searchTerm){
    requirejs(['search/models/searchModelAndCollection'], function (MovieSearchCollection) {
        holdMovieName = searchTerm;
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
                //cleanup results
                resultsView.cleanupResultsView();
                movieDetailsView = new MovieDetailsView({model: movieDetailsModel , onBackCallback:backToResults});
                movieDetailsView.showDetailsView();
        })

    })

};

var cleanInputField = function () {

    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        $('.movie').val('');
        var searchView = new SearchView({onSearchCallback: onSearchHandler});
    })
}


var presentResultsTable = function(movieSearchCollection){
    requirejs(['results/views/resultsView' ,  ], function (ResultsView) {
        var resultsModel = new Backbone.Model();
        resultsModel.set('moviesSearchCollection', movieSearchCollection);

        resultsView = new ResultsView({model: resultsModel, onChosenMovieCallback: presentMovieDetails , onNewSearchCallback: cleanInputField});
    })
};

define(function () {
    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        var searchView = new SearchView({onSearchCallback: onSearchHandler});
    })
})


var backToResults = function()
{
    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        movieDetailsView.cleanupDetailsView();
        resultsView.showResultsView();
    })
}