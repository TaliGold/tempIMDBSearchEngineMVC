define(function () {

    return Backbone.Model.extend({
        url: "http://www.omdbapi.com/?i=",
        initialize: function (options){
            this.imdbID = options.imdbID;
            this.url = this.url + this.imdbID;
            // this.parse();
        }
        // parse: function (data) {
        //     console.log(data.Search);
        //     debugger
        //     return data.Search;
        // }
    })
})





