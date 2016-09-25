requirejs.config( { packages: [
    {
        name: 'text',
        location: '../libs',
        main: 'text'
    }
]});

var resultsView;
var movieDetailsView;
var router;


var onSearchHandler = function(searchTerm){
    requirejs(['router/viewsRouter'], function (Router) {
        var addToUrl = 'results/:'+searchTerm
        router.navigate(addToUrl, true);
    })
};

var onCreateResultsCollection = function (searchTerm) {
    requirejs(['search/models/searchModelAndCollection'], function (MovieSearchCollection) {
        var movieSearchCollection = new MovieSearchCollection([], {searchTerm: searchTerm});
        movieSearchCollection.fetch()
            .always(function(){
                presentResultsView(movieSearchCollection);
            })
    })
}

var presentResultsView = function(movieSearchCollection){
    requirejs(['results/views/resultsView' ], function (ResultsView) {
        var resultsModel = new Backbone.Model();
        resultsModel.set('moviesSearchCollection', movieSearchCollection);

        resultsView = new ResultsView({model: resultsModel, onChosenMovieCallback: routesToMovieDetails , onNewSearchCallback: cleanInputField});
    })
};

var routesToMovieDetails = function (imdbId) {
    requirejs(['router/viewsRouter'], function (Router) {
        var addToUrl = 'details/:'+imdbId;
        router.navigate(addToUrl, true);
    })
}


var presentMovieDetails = function(imdbId){
    requirejs(['movieDetails/models/movieDetailsModel' , 'movieDetails/views/movieDetailsView'], function (MovieDetailsModel , MovieDetailsView) {

        var movieDetailsModel = new MovieDetailsModel({imdbID: imdbId});
        movieDetailsModel.fetch()
            .always(function(){
                //cleanup results
                resultsView.cleanupResultsView();
                movieDetailsView = new MovieDetailsView({model: movieDetailsModel , onBackCallback:routeWhenBackButton});
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

define(function () {
    requirejs(['router/viewsRouter'], function (Router) {
        router = new Router({
            onDefaultCallback       : presentInitialSearchScreen, 
            onResultsCallback       : onCreateResultsCollection,
            onDetailsCallback       : presentMovieDetails,
            onBackButtonCallback    : backToResults,
            onBackToSearchCallback  : cleanInputField });
        Backbone.history.start();
    })
})


var presentInitialSearchScreen = function () {
    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        var searchView = new SearchView({onSearchCallback: onSearchHandler});
    })
}

var routeWhenBackButton = function () {
    router.navigate('backToResults', true);
}

var backToResults = function()
{
    requirejs(['search/views/searchView', 'movieDetails/views/movieDetailsView'], function (SearchView, MovieDetailsView) {
        movieDetailsView.cleanupDetailsView();
        resultsView.showResultsView();
    })
}