'use strict';

angular.module('mean.posts').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Happening', {
            url: '/posts/example',
            templateUrl: 'posts/views/index.html'
        });
    }
]);
