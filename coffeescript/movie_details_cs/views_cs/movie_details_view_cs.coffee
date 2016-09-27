template = require '../templates_cs/movie_details_page_elements_cs.html'

MovieDetailsView = ->
  Backbone.View.extend
    el: '.table-of-movie-details'
    tagName: 'table'
    initialize: (obj) ->
      @onBackCallback = obj.onBackCallback
      @render()
      return
    render: ->
      @$el.html template
      me = this
      movieModel = @model
      #Add movie info to the right properties
      if movieModel.get('Poster') == 'N/A'
        $('.movie-poster').html '<img src="images/noImageAvaliable.jpg"/>'
      else
        $('.movie-poster').html '<img src="' + movieModel.get('Poster') + '" />'
      # me.$el.find('.second.col.metacritics-rating').append(movieModel.get('Title'));
      $('.movie-title-headline').text movieModel.get('Title')
      $('.metacritics-rating').text movieModel.get('Metascore')
      $('.imdb-rating').text movieModel.get('imdbRating')
      $('.actors').text movieModel.get('Actors')
      $('.awards').text movieModel.get('Awards')
      $('.country').text movieModel.get('Country')
      $('.director').text movieModel.get('Director')
      $('.genre').text movieModel.get('Genre')
      $('.language').text movieModel.get('Language')
      $('.plot').text movieModel.get('Plot')
      $('.released').text movieModel.get('Released')
      $('.runtime').text movieModel.get('Runtime')
      $('.button-place').html '<button class="go-back-button hvr-icon-back" >Back</button>'
      $('.movie-name').html movieModel.get('Title')
      return
    events: 'click .go-back-button': 'back'
    back: ->
      @onBackCallback()
      return
    cleanupDetailsView: ->
      $('.table-of-movie-details').hide()
      return
    showDetailsView: ->
      $('.table-of-movie-details').show()
      return

exports.MovieDetailsView = MovieDetailsView;