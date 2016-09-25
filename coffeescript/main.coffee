requirejs.config packages: [ {
  name: 'text'
  location: '../libs'
  main: 'text'
} ]
resultsView = undefined
movieDetailsView = undefined
router = undefined

onSearchHandler = (searchTerm) ->
  requirejs [ 'router_cs/views_router' ], (Router) ->
    addToUrl = 'results/:' + searchTerm
    router.navigate addToUrl, true
    return
  return

onCreateResultsCollection = (searchTerm) ->
  requirejs [ 'search_cs/models_cs/search_model_and_collection_cs' ], (MovieSearchCollection) ->
    movieSearchCollection = new MovieSearchCollection([], searchTerm: searchTerm)
    movieSearchCollection.fetch().always ->
      presentResultsView movieSearchCollection
      return
    return
  return

presentResultsView = (movieSearchCollection) ->
  requirejs [ 'results_cs/views_cs/results_view_cs' ], (ResultsView) ->
    resultsModel = new (Backbone.Model)
    resultsModel.set 'moviesSearchCollection', movieSearchCollection
    resultsView = new ResultsView(
      model: resultsModel
      onChosenMovieCallback: routesToMovieDetails
      onNewSearchCallback: cleanInputField)
    return
  return

routesToMovieDetails = (imdbId) ->
  requirejs [ 'router_cs/views_router_cs' ], (Router) ->
    addToUrl = 'details/:' + imdbId
    router.navigate addToUrl, true
    return
  return

presentMovieDetails = (imdbId) ->
  requirejs [
    'movie_details_cs/models_cs/movie_details_model_cs'
    'movie_details/views_cs/movie_details_view_cs'
  ], (MovieDetailsModel, MovieDetailsView) ->
    movieDetailsModel = new MovieDetailsModel(imdbID: imdbId)
    movieDetailsModel.fetch().always ->
#cleanup results
      resultsView.cleanupResultsView()
      movieDetailsView = new MovieDetailsView(
        model: movieDetailsModel
        onBackCallback: routeWhenBackButton)
      movieDetailsView.showDetailsView()
      return
    return
  return

cleanInputField = ->
  requirejs [
    'search_cs/views_cs/search_view_cs'
    'movie_details_cs/views_cs/movie_details_view_cs'
  ], (SearchView, MovieDetailsView) ->
    $('.movie').val ''
    searchView = new SearchView(onSearchCallback: onSearchHandler)
    return
  return

define ->
  requirejs [ 'router_cs/views_router_cs' ], (Router) ->
    router = new Router(
      onDefaultCallback: presentInitialSearchScreen
      onResultsCallback: onCreateResultsCollection
      onDetailsCallback: presentMovieDetails
      onBackButtonCallback: backToResults
      onBackToSearchCallback: cleanInputField)
    Backbone.history.start()
    return
  return

presentInitialSearchScreen = ->
  requirejs [
    'search_cs/views_cs/search_view_cs'
    'movie_details_cs/views_cs/movie_details_view_cs'
  ], (SearchView, MovieDetailsView) ->
    searchView = new SearchView(onSearchCallback: onSearchHandler)
    return
  return

routeWhenBackButton = ->
  router.navigate 'backToResults', true
  return

backToResults = ->
  requirejs [
    'search_cs/views_cs/search_view_cs'
    'movie_details_cs/views_cs/movie_details_view_cs'
  ], (SearchView, MovieDetailsView) ->
    movieDetailsView.cleanupDetailsView()
    resultsView.showResultsView()
    return
  return
