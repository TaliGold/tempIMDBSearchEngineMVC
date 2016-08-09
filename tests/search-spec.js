browser.ignoreSynchronization = true;
describe('open search engine and look for the movie "room"', function () {
    it('should search for the movie "room"', function () {

        browser.get('http://localhost:8081/index.html');

        browser.wait(function () {
            return element(by.css('.movie')).isPresent();
        });

        expect($('.movie').isDisplayed()).toBeTruthy();
        
        expect(browser.getTitle()).toEqual('Search for Movie');
        element(by.css('.movie')).sendKeys('room');
        var enter = browser.actions().sendKeys(protractor.Key.ENTER);
        enter.perform();

    });

    it('should check table content ok', function () {

        browser.wait(function () {
            return element(by.css('.table-of-results-row')).isPresent();
        });

        var tableOfResults = element.all(by.css('.table-of-results-row'));
        expect(tableOfResults.count()).toEqual(10);
        var posters = element.all(by.css('.img-cell-poster'));


        checkMovie(0, 'Panic Room (2002)', 'http://ia.media-imdb.com/images/M/MV5BNmY4ZGFjYTYtMDNmYi00ZDM4LWFjYTgtNmNlZjBmMzg0MzQ3XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg/');
        checkMovie(1, 'Room (2015)', 'http://ia.media-imdb.com/images/M/MV5BMjE4NzgzNzEwMl5BMl5BanBnXkFtZTgwMTMzMDE0NjE@._V1_SX300.jpg/');
        checkMovie(2, 'Boiler Room (2000)', 'http://ia.media-imdb.com/images/M/MV5BMTIxNzc3NDA4N15BMl5BanBnXkFtZTYwMzU2OTk2._V1_SX300.jpg/');
        checkMovie(3, 'The Room (2003)', 'http://ia.media-imdb.com/images/M/MV5BMTg4MTU1MzgwOV5BMl5BanBnXkFtZTcwNjM1MTAwMQ@@._V1_SX300.jpg/');
        checkMovie(4, 'A Room with a View (1985)', 'http://ia.media-imdb.com/images/M/MV5BMTQyODE1NzMxMl5BMl5BanBnXkFtZTgwMjU2MTUxMDE@._V1_SX300.jpg/');
        checkMovie(5, 'Green Room (2015)', 'http://ia.media-imdb.com/images/M/MV5BMjU1ODQ5NzA0N15BMl5BanBnXkFtZTgwMDg5MTA5NzE@._V1_SX300.jpg/');
        checkMovie(6, 'The Lost Room (2006)', 'http://ia.media-imdb.com/images/M/MV5BMzIyMzQ2ODgxOV5BMl5BanBnXkFtZTcwMzk1MTc0MQ@@._V1_SX300.jpg/');
        checkMovie(7, 'Marvin\'s Room (1996)', 'http://ia.media-imdb.com/images/M/MV5BMTIzOTkzMzc3M15BMl5BanBnXkFtZTYwNjYyNDU5._V1_SX300.jpg/');
        checkMovie(8, 'Room 237 (2012)', 'http://ia.media-imdb.com/images/M/MV5BMzQyMjgzNzAwNl5BMl5BanBnXkFtZTcwODI0NjIzNw@@._V1_SX300.jpg/');
        checkMovie(9, 'Room in Rome (2010)', 'http://ia.media-imdb.com/images/M/MV5BMTk2ODk2MjAzMl5BMl5BanBnXkFtZTgwNDA2MjcwMzE@._V1_SX300.jpg/');

        function checkMovie(index, movieName, moviePoster) {
            checkMovieName(index, movieName);
            checkMoviePoster(index, moviePoster);
        }

        function checkMovieName(index, movieName) {
            tableOfResults.get(index).getText().then(function (text) {
                expect(text).toEqual(movieName);
            });
        }

        function checkMoviePoster(index, moviePoster) {

            var firstPoser = posters.get(index);

            firstPoser.getAttribute('src').then(function (srcUrl) {
                expect(srcUrl).toEqual(moviePoster);
            });
        }

    })

    it('should click on a movie', function () {

        var tableOfResults  = element.all(by.css('.table-of-results-row'));
        tableOfResults.get(1).click();
        
        browser.wait(function () {
            return element(by.css('.found-movie')).isPresent();
        });

        //Assert requested movie table is displayed
        expect($('.found-movie').isDisplayed()).toBeTruthy();

        //Assert poster is displayed
        expect($('.first-column.movie-poster').isDisplayed()).toBeTruthy();

        //Check movie has 11 rows of info
        var movieInfoDetails = element.all(by.css('.first.col'));
        expect(movieInfoDetails.count()).toEqual(11);
    })
});