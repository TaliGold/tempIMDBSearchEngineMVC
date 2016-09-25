describe("MovieEngine", function () {
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
})
