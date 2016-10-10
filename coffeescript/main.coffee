viewRouterCsExports = require './router_cs/views_router_cs.coffee'
MovieSearchCollection = require './search_cs/models_cs/search_model_and_collection_cs.coffee'
ResultsView = require './results_cs/views_cs/results_view_cs.coffee'
MovieDetailsModel = require './movie_details_cs/models_cs/movie_details_model_cs.coffee'
MovieDetailsView = require './movie_details_cs/views_cs/movie_details_view_cs.coffee'
SearchView = require './search_cs/views_cs/search_view_cs.coffee'
require 'jquery'
require 'sweetalert'
require 'underscore'
require 'backbone'
require '../libs/hover/hover.css'
require 'font-awesome/css/font-awesome.css'


#requirejs.config packages:[{
#  name: 'text'
#  location: '../libs'
#  main: 'text'
#}]

resultsView = undefined
movieDetailsView = undefined
router = undefined


router = new viewRouterCsExports(
  onDefaultCallback: presentInitialSearchScreen
  onResultsCallback: onCreateResultsCollection
  onDetailsCallback: presentMovieDetails
  onBackButtonCallback: backToResults
  onBackToSearchCallback: cleanInputField)
Backbone.history.start()


onSearchHandler = (searchTerm) ->
  addToUrl = 'results/:' + searchTerm
  router.navigate addToUrl, true
  return


onCreateResultsCollection = (searchTerm) ->
  movieSearchCollection = new MovieSearchCollection([], searchTerm: searchTerm)
  movieSearchCollection.fetch().always ->
      presentResultsView movieSearchCollection
      return
  return

presentResultsView = (movieSearchCollection) ->
  resultsModel = new (Backbone.Model)
  resultsModel.set 'moviesSearchCollection', movieSearchCollection
  resultsView = new ResultsView(
    model: resultsModel
    onChosenMovieCallback: routesToMovieDetails
    onNewSearchCallback: cleanInputField)
  return

routesToMovieDetails = (imdbId) ->
  addToUrl = 'details/:' + imdbId
  router.navigate addToUrl, true
  return

presentMovieDetails = (imdbId) ->
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

cleanInputField = ->
  $('.movie').val ''
  searchView = new SearchView(onSearchCallback: onSearchHandler)
  return

presentInitialSearchScreen = ->
  searchView = new SearchView(onSearchCallback: onSearchHandler)
  return

routeWhenBackButton = ->
  router.navigate 'backToResults', true
  return

backToResults = ->
  movieDetailsView.cleanupDetailsView()
  resultsView.showResultsView()
  return
