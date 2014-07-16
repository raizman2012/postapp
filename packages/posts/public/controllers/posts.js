'use strict';

angular.module('mean.posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Global', 'Posts',
    function($scope, $stateParams, $location, Global, Posts) {
        $scope.global = Global;
        $scope.package = {
            name: 'posts'
        };

        $scope.create = function() {
            console.log('create..');
//
//            Posts.query(function(posts) {
//                console.log('create..', posts);
//            });

            var post = new Posts({
                title: 'title',
                content: 'content',
                location: {
                    type: 'Point',
                    coordinates: [41.20, -34.84]


                }
            });

            console.log('save post:', post);
            post.$save(function(response) {
                console.log(response);
                //$location.path('posts/' + response._id);
            });
        };
        //  [153.029884, -27.45643]
        //[ 41.20552261955812,
        // -90.84869384765625]
    }
]);
