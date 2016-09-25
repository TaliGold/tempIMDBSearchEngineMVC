routeStripper = /^[#\/]/
Backbone.CleanupRouter = Backbone.Router.extend(
  navigate: (fragment) ->
# Filter cases where navigate exists without navigate
    if !Backbone.History.started
      return false
    frag = (fragment or '').replace(routeStripper, '')
    if Backbone.history.fragment == frag
      return
    #the Router’s ‘currentView’ member as a reference to the current visible view.
    if @currentView
      @currentView.cleanupAll()
      @currentView = null
    Backbone.Router::navigate.apply this, arguments
    return
  markCurrentView: (view) ->
    @currentView = view
    return
)