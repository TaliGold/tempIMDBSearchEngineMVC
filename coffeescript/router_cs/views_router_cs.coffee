viewRouterCsExports = ->
  Backbone.Router.extend
    routes:
      '': 'presentMainSearchScreen'
      'results/:movieName': 'presentResults'
      'details/:imdbId': 'presentDetails'
      'backToResults': 'backButtonClick'
      'backToSearch': 'backToSearchClick'
    initialize: (obj) ->
      @onDefaultCallback = obj.onDefaultCallback
      @onResultsCallback = obj.onResultsCallback
      @onDetailsCallback = obj.onDetailsCallback
      @onBackButtonCallback = obj.onBackButtonCallback
      @onBackToSearchCallback = obj.onBackToSearchCallback
      return
    presentMainSearchScreen: ->
      @onDefaultCallback()
      return
    presentResults: (movieName) ->
      @onResultsCallback movieName
      return
    presentDetails: (imdbId) ->
      @onDetailsCallback imdbId.split(':')[1]
      return
    backButtonClick: ->
      @onBackButtonCallback()
      return
    backToSearchClick: ->
      @onBackToSearchCallback()
      return
      
exports.viewRouterCsExports = viewRouterCsExports; 