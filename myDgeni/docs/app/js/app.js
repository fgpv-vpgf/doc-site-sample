
(function(angular) {
    'use strict';
    // NOTE: ngSelect and hljs are only included to support
    // tabs that dynamically load code and highlight syntax
    // see: https://github.com/pc035860/angular-highlightjs#demos
    angular
        .module('app', ['ngRoute'])
        .config(function(PAGES, API, $routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/home.tmpl.html'
                // controller: 'ExamplesCtrl'
            })
            // manually added for testing purpose
            .when('/api/esriLoader', {
                templateUrl: './partials/modules/esri/maps/services/esriLoader/index.html'
            })
            .otherwise({
                redirectTo: '/'
            });


            angular.forEach(PAGES, function(pages, area) {
                angular.forEach(pages, function(page) {
                    $routeProvider
                        .when(page.url, {
                            templateUrl: page.outputPath
                            // uncomment to add controller for the page
                            // , controller: 'SomeController'
                        });
                });
            });

            angular.forEach(API, function(apis, area) {
            $routeProvider
                .when(api.url, {
                    templateUrl: api.outputPath
                    // uncomment to add controller for the page
                    // , controller: 'SomeController'
                });
            });
        });
})(angular);
