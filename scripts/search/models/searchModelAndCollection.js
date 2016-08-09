define(function () {
    var MovieModel = Backbone.Model.extend({});

    return Backbone.Collection.extend(
        {
            model: MovieModel,
            url: "http://www.omdbapi.com/" + "?s=",
            initialize: function (models, options){
                this.movieName = options.searchTerm;
                this.url = this.url + this.movieName;
            },
            parse: function (data) {
                //console.log(data.Search);
                return data.Search;
            }
        })

})
