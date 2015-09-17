(function(angular) {
    'use strict';
    // NOTE: ngSelect and hljs are only included to support
    // tabs that dynamically load code and highlight syntax
    // see: https://github.com/pc035860/angular-highlightjs#demos
    angular
        .module('app', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: './partials/home.tmpl.html'
                // controller: 'ExamplesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        });
})(angular);
