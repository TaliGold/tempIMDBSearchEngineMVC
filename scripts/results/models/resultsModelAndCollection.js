

var MovieSearchCollection = Backbone.Collection.extend(
    {

        model: MovieModel,
        constructor: function (obj){
            this.movie = obj.searchTerm;
        },
        url: "http://www.omdbapi.com/" + "?s=" + this.movie,
        parse: function (data) {
            return data.Search;
        }
    })


var movieSearchCollection = new MovieSearchCollection();

movieSearchCollection.fetch()
    .always(function () {
        console.log( movieSearchCollection);

    })

// var MovieListModel = Backbone.Model.extend({});
// var movieListModel = new MovieListModel();
//
// movieListModel.set('movieCollection', movieSearchCollection);
