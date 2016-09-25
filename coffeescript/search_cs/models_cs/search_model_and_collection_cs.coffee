define ->
  MovieModel = Backbone.Model.extend({})
  Backbone.Collection.extend
    model: MovieModel
    url: 'http://www.omdbapi.com/' + '?s='
    initialize: (models, options) ->
      @movieName = options.searchTerm
      @url = @url + @movieName
      return
    parse: (data) ->
#console.log(data.Search);
      data.Search
      
      