define(['text!../templates/movieDetailsPageElements.html'], function (template ) {
    return Backbone.View.extend({
        el:'.table-of-movie-details',
        tagName: 'table',

        initialize : function () {
            this.render();
        },

        render : function () {
            this.$el.html(template);
            var me = this;
            var movieModel = this.model;
            //Add movie info to the right properties
            if (movieModel.get('Poster') === "N/A") {
                $('.movie-poster').html('<img src="../images/noImageAvaliable.jpg"/>');
            }
            else {
                $('.movie-poster').html('<img src="' + movieModel.get('Poster') + '" />');
            }
            debugger;
           // me.$el.find('.second.col.metacritics-rating').append(movieModel.get('Title'));
            $('.movie-title-headline').text(movieModel.get('Title'));
            $('.metacritics-rating').text(movieModel.get('Metascore'));
            $('.imdb-rating').text(movieModel.get('imdbRating'));
            $('.actors').text(movieModel.get('Actors'));
            $('.awards').text(movieModel.get('Awards'));
            $('.country').text(movieModel.get('Country'));
            $('.director').text(movieModel.get('Director'));
            $('.genre').text(movieModel.get('Genre'));
            $('.language').text(movieModel.get('Language'));
            $('.plot').text(movieModel.get('Plot'));
            $('.released').text(movieModel.get('Released'));
            $('.runtime').text(movieModel.get('Runtime'));
            
        }
    });
});
