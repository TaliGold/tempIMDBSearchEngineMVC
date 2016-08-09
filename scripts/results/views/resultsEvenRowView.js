define(['text!../templates/resultsPageElements.html'], function (template) {

    return Backbone.View.extend({
        el: '.table-of-results-row.even',
        render: function () {
            
            var poster = this.model.get('Poster');
            if (poster === "N/A") {
                poster = "images/noImageAvaliable.jpg";
            }


            this.$el.html('<td class="img-cell">' +
                '<img class="img-cell-poster" src = ' + poster + '/>' +
                '</td> ' +
                '<td>'+ this.model.get('Title') + ' (' + this.model.get('Year') + ')' + '</td>');
            return this;
        }
    });
});