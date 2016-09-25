define( function(){
    return Backbone.Router.extend({
        routes:{
            ""                  :"presentMainSearchScreen",
            "results/:movieName":"presentResults",
            "details/:imdbId"   : "presentDetails",
            "backToResults"     : "backButtonClick",
            "backToSearch"      : "backToSearchClick"
        },

        initialize : function (obj) {
            this.onDefaultCallback      = obj.onDefaultCallback;
            this.onResultsCallback      = obj.onResultsCallback;
            this.onDetailsCallback      = obj.onDetailsCallback;
            this.onBackButtonCallback   = obj.onBackButtonCallback;
            this.onBackToSearchCallback = obj.onBackToSearchCallback
        },

        presentMainSearchScreen : function () {
            this.onDefaultCallback();
        },

        presentResults : function (movieName) {
            this.onResultsCallback(movieName);
        },

        presentDetails : function (imdbId) {
            this.onDetailsCallback(imdbId.split(":")[1]);
        },

        backButtonClick : function () {
            this.onBackButtonCallback(); 
        },

        backToSearchClick : function () {
            this.onBackToSearchCallback();
        }
    })
})
 
