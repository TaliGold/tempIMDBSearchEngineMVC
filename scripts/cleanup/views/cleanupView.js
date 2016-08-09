Backbone.CleanupView = Backbone.View.extend({
    constructor: function() {
        this.nestedViews = [];
        Backbone.View.prototype.constructor.apply(this, arguments);
    },
    setNestedView: function(view) {
        this.nestedViews.push(view);
    },
    cleanup: function() {
        // This method should be overridden
    },
    cleanupAll: function() {
        for (var i in this.nestedViews) {
            this.nestedViews[i].cleanup();
        }
        this.nestedViews = null;
        this.cleanup();
    }
});
