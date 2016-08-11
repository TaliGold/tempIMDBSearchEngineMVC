define(['text!../templates/resultsPageElements.html', './resultsOddRowView' , './resultsEvenRowView' ,'../../movieDetails/views/movieDetailsView' ],
    function (template , resultsOddRowView , resultsEvenRowView, MovieDetailsView ) {
    return Backbone.View.extend({
        el: '.table-of-results',
        tagName: 'table',
        
        initialize : function (obj) {
            this.onChosenMovieCallback =  obj.onChosenMovieCallback; 
            this.onNewSearchCallback = obj.onNewSearchCallback;
            this.render();
        },

        render : function () {
            this.$el.html(template);
            var me = this;
            var i = 0;
            this.model.get('moviesSearchCollection').forEach(function(movieModel){
                var isEven = (i % 2 == 0);
                var className = "table-of-results-row";
                className += isEven ? " even" : " odd";
                var movieViewEl = $('<tr class ="' + className +'" id=' + movieModel.get('imdbID') + '></tr>');
                me.$el.find('.results-table tbody').append(movieViewEl);
                var movieView;
                movieView = isEven ? new resultsEvenRowView({model: movieModel, el: movieViewEl}) : new resultsOddRowView({model: movieModel, el: movieViewEl});
                movieView.render();
                i++;
            })

            $('.button-place').html('<button class="go-back-button hvr-icon-back" >Back</button>');
        },

        events: {
            "click .table-of-results-row":          "presentMovieDetails",
            "click .go-back-button":          "newSearch"
        },

        presentMovieDetails: function(event){
            this.onChosenMovieCallback(event.currentTarget.id);
        },

        cleanupResultsView : function () {
            $('.table-of-results').hide();
        },
        
        showResultsView : function () {
            $('.table-of-results').show();
        },

        newSearch: function(){
            this.onNewSearchCallback();
        },
    });
});