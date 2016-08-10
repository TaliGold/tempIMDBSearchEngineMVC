var routeStripper = /^[#\/]/;


Backbone.CleanupRouter = Backbone.Router.extend({

    //Override Router’s ‘navigate()’ method and
    // cleanup the view right before the navigation.
    navigate: function(fragment) {
        // Filter cases where navigate exists without navigate
        if (!Backbone.History.started) return false;
        var frag = (fragment || '').replace(routeStripper, '');
        if (Backbone.history.fragment == frag) return;

        //the Router’s ‘currentView’ member as a reference to the current visible view.
        if (this.currentView) {
            this.currentView.cleanupAll();
            this.currentView = null;
        }
        Backbone.Router.prototype.navigate.apply(this, arguments);
    },

    //In order to let instances of such a router to mark the current view
    markCurrentView: function(view) {
        this.currentView = view;
    }
});
