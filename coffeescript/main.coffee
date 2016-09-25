requirejs.config packages: [ {
  name: 'text'
  location: '../libs'
  main: 'text'
} ]
resultsView = undefined
movieDetailsView = undefined
router = undefined

onSearchHandler = (searchTerm) ->
  requirejs [ 'router/viewsRouter' ], (Router) ->
    addToUrl = 'results/:' + searchTerm
    router.navigate addToUrl, true
    return
  return

onCreateResultsCollection = (searchTerm) ->
  requirejs [ 'search/models/searchModelAndCollection' ], (MovieSearchCollection) ->
    movieSearchCollection = new MovieSearchCollection([], searchTerm: searchTerm)
    movieSearchCollection.fetch().always ->
      presentResultsView movieSearchCollection
      return
    return
  return

presentResultsView = (movieSearchCollection) ->
  requirejs [ 'results/views/resultsView' ], (ResultsView) ->
    resultsModel = new (Backbone.Model)
    resultsModel.set 'moviesSearchCollection', movieSearchCollection
    resultsView = new ResultsView(
      model: resultsModel
      onChosenMovieCallback: routesToMovieDetails
      onNewSearchCallback: cleanInputField)
    return
  return

routesToMovieDetails = (imdbId) ->
  requirejs [ 'router/viewsRouter' ], (Router) ->
    addToUrl = 'details/:' + imdbId
    router.navigate addToUrl, true
    return
  return

presentMovieDetails = (imdbId) ->
  requirejs [
    'movieDetails/models/movieDetailsModel'
    'movieDetails/views/movieDetailsView'
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
    'search/views/searchView'
    'movieDetails/views/movieDetailsView'
  ], (SearchView, MovieDetailsView) ->
    $('.movie').val ''
    searchView = new SearchView(onSearchCallback: onSearchHandler)
    return
  return

define ->
  requirejs [ 'router/viewsRouter' ], (Router) ->
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
    'search/views/searchView'
    'movieDetails/views/movieDetailsView'
  ], (SearchView, MovieDetailsView) ->
    searchView = new SearchView(onSearchCallback: onSearchHandler)
    return
  return

routeWhenBackButton = ->
  router.navigate 'backToResults', true
  return

backToResults = ->
  requirejs [
    'search/views/searchView'
    'movieDetails/views/movieDetailsView'
  ], (SearchView, MovieDetailsView) ->
    movieDetailsView.cleanupDetailsView()
    resultsView.showResultsView()
    return
  return
