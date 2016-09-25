class search_views_cs

  define [ 'text!../templates_cs/search_page_elements_cs.html' ], (template) ->
  ENTER_KEY_CODE = 13
  Backbone.View.extend
    el: '.hold-search-elements'
    tagName: 'div'
    className: ''
    initialize: (obj) ->
      @onSearchCallback = obj.onSearchCallback
      @render()
      return
    events:
      'click .search-button': 'search'
      'keyup .movie': 'enterKeySearch'
    search: ->
      @onSearchCallback $('.movie').val()
      return
    enterKeySearch: (event) ->
      if event.keyCode == ENTER_KEY_CODE
        @onSearchCallback $('.movie').val()
      return
    render: ->
      @$el.html template
      return
