var routeStripper = /^[#\/]/;
Backbone.CleanupRouter = Backbone.Router.extend({
    navigate: function(fragment) {
        // Filter cases where navigate exists without navigate
        if (!Backbone.History.started) return false;
        var frag = (fragment || '').replace(routeStripper, '');
        if (Backbone.history.fragment == frag) return;

        if (this.currentView) {
            this.currentView.cleanupAll();
            this.currentView = null;
        }
        Backbone.Router.prototype.navigate.apply(this, arguments);
    },
    markCurrentView: function(view) {
        this.currentView = view;
    }
});
