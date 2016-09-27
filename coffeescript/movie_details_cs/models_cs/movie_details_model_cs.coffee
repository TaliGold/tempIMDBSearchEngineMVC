MovieDetailsModel = ->
  Backbone.Model.extend
    url: 'http://www.omdbapi.com/?i='
    initialize: (options) ->
      @imdbID = options.imdbID
      @url = @url + @imdbID
      return

exports.MovieDetailsModel = MovieDetailsModel; 