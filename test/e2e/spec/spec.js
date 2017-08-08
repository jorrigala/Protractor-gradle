describe("Current Angular UI router state", function () {
    var homePage = element(by.css('[ui-sref="home"]'));
    var aboutLink = element(by.css('[ui-sref="about"]'));
    var contactLink = element(by.css('[ui-sref="contacts.list"]')); 
    var uiViewDirective = element(by.css('div[ui-view]'))  

    beforeEach(function () {
        browser.get("https://angular-ui.github.io/ui-router/sample/#/");
    });

    function currentStateName(){
        var currentStateName =  browser.executeAsyncScript(function(callback) {
            var el = document.querySelector("html");  // ng-app is defined on html element in this case
            var injector = angular.element(el).injector();
            var service = injector.get('$state');           

            callback(service.current.name);
        });
        browser.driver.sleep(1000); 
        return currentStateName;
    }

    function clickLink(link){
        link.click();
        browser.driver.sleep(1000); 
    }

    it("check home page", function (){         

        expect(currentStateName()).toEqual("home");
        expect(uiViewDirective.isPresent()).toBeTruthy();
        expect(aboutLink.isPresent()).toBeTruthy();
        expect(contactLink.isPresent()).toBeTruthy();
    });

    it("check about page", function (){         

        expect(currentStateName()).toEqual("home");

        clickLink(aboutLink);

        expect(currentStateName()).toEqual("about");

        var aboutLinks = uiViewDirective.all(by.css("ul li"));

        expect(aboutLinks.count(),5);

        
    });    
});