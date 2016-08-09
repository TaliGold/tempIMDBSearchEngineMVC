define(['text!../templates/searchPageElements.html'], function (template) {
    var ENTER_KEY_CODE = 13;
    return Backbone.View.extend({
        el: '.hold-search-elements',
        tagName: 'div',
        className: '',
        initialize : function (obj) {
            this.onSearchCallback = obj.onSearchCallback;
            this.render();
        },
        events: {
            "click .search-button":          "search",
            "keyup .movie":   "enterKeySearch"
        },

        search: function(){
            this.onSearchCallback($('.movie').val())
        },

        enterKeySearch: function(event){
            if (event.keyCode == ENTER_KEY_CODE) {
                this.onSearchCallback($('.movie').val())
            }
        },

        render : function () {
            this.$el.html(template);

        },

    });

});