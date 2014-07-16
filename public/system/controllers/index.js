'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Posts', 'SearchPosts', '$location', '$resource', function ($scope, Global, Posts, SearchPosts, $location, $resource) {
    $scope.global = Global;

    $scope.searchByRectangle = function() {


        var params = {
            bounds : $scope.map.bounds,
            tags : ['food', 'fun']
        };

        SearchPosts.searchWithFilter(params, function(posts){
            console.log('posts:', posts);

            $scope.posts = posts;
            $scope.map.markers = [];

            for (var i = 0; i < posts.length; i++) {
                var marker = { showWindow: true, id: i};
                var post = posts[i];
                marker.title = post.title;
                marker.longitude = post.location.coordinates[0];
                marker.latitude = post.location.coordinates[1];
                //console.log(marker);
                $scope.map.markers.push(marker);
            }
        });
    };

    $scope.map = {
        markers: [
            {
                id: 1,
                latitude: 45,
                longitude: -74,
                showWindow: false,
                title: 'Marker 2'
            },
            {
                id: 2,
                latitude: 15,
                longitude: 30,
                showWindow: false,
                title: 'Marker 2'
            },
            {
                id: 3,
                latitude: 37,
                longitude: -122,
                showWindow: false,
                title: 'Plane'
            }
        ],
        events: {
            tilesloaded: function (map, eventName, originalEventArgs) {
            },
            zoom_changed : function (map, eventName, originalEventArgs){
                console.log('zoom');
            },
            bounds_changed  : function (map, eventName, originalEventArgs) {
                console.log('bounds');
            },
            dragend  : function (map, eventName, originalEventArgs) {
                console.log('dragend', $scope.map.center);

                $scope.searchByRectangle();
            },
            click: function (mapModel, eventName, originalEventArgs) {
                // 'this' is the directive's scope
                console.log('user defined event: ' + eventName, mapModel, originalEventArgs);

                var e = originalEventArgs[0];

                if (!$scope.map.clickedMarker) {
                    $scope.map.clickedMarker = {
                        title: 'You clicked here',
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
                    };
                }
                else {
                    var marker = {
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
                    };
                    $scope.map.clickedMarker = marker;
                }

                console.log('marker: ', $scope.map.clickedMarker);

                var post = new Posts({
                    title: 'title',
                    content: 'wow',
                    location: {
                        type: 'Point',
                        coordinates: [
                            $scope.map.clickedMarker.longitude,
                            $scope.map.clickedMarker.latitude]
                    }
                });

                console.log('save post:', post);
                post.$save(function (response) {
                    console.log(response);
                    //$location.path('posts/' + response._id);
                });

                //scope apply required because this event handler is outside of the angular domain
                $scope.$apply();
            }
        },
        center: {
            latitude: 32.07771034554237,
            longitude: 34.76860736083985 },
        zoom: 14, bounds: {}
    };
    $scope.options = {scrollwheel: false};
    var createRandomMarker = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey === null) {
            idKey = 'id';
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i,
            show: false
        };
        ret.onClick = function () {
            console.log('Clicked!');
            ret.show = true;
            $scope.$apply();
        };
        ret[idKey] = i;
        return ret;
    };


    $scope.loadPosts = function () {
        Posts.query(function (posts) {
            //console.log(posts);
            $scope.posts = posts;
            $scope.map.markers = [];

            for (var i = 0; i < posts.length; i++) {
                var marker = { showWindow: true, id: i};
                var post = posts[i];
                marker.title = post.title;
                marker.longitude = post.location.coordinates[0];
                marker.latitude = post.location.coordinates[1];
                //console.log(marker);
                $scope.map.markers.push(marker);
            }
            //$scope.$apply();
        });
    };

    $scope.onMarkerClicked = function (m) {
        console.log(m);
    };

    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function () {
        return $scope.map.bounds;
    }, function (nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
            var markers = [];
            for (var i = 0; i < 50; i++) {
                markers.push(createRandomMarker(i, $scope.map.bounds));
            }
            $scope.randomMarkers = markers;
        }
    }, true);
}]);