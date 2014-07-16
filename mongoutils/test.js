console.log('test');
var mongoose = require('mongoose');
var async = require('async');
var PostSchema = require('./../packages/posts/server/models/post.js');
//var assert = require('assert')

var Post = mongoose.model('Post');

console.log('\n===========');
console.log('    mongoose version: %s', mongoose.version, Post);
console.log('========\n\n');

//createMany();
var dbname = 'mean-dev';
mongoose.connect('localhost', dbname);
mongoose.connection.on('error', function () {
    console.error('connection error', arguments);
});

var example =
{ title: 'title',
    content: 'wow',
    location: { type: 'Point',
        coordinates: [ 34.777575731277466, 32.065992228606866 ] } };

mongoose.connection.on('open', function () {
    console.log('remove all');
    Post.remove().exec();

    count();
    //createMany();
    //count();


    //done();
});


function count() {
    Post.find().exec(function (err, posts) {
        if (err) {
            console.log('err:', err);
        } else {
            console.log('l:', posts.length);
        }

        done();
    });
}
function createMany() {
    var long = 0;
    var lat = 0;

    var calls = [];

    var count = 0;
    var cb = function (err, result) {
        console.log('in cb, ', err, result);
        if (err) {
            return err;
        }

        count++;

        console.log('count', count);
        if (count == calls.length) {
            done();
        }
    };


    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {

            var myFunction = function (callback, i, j) {
                console.log(i, ':', j);
                var long1 = long + i;
                var lat1 = lat + j;
                var pp = {
                    title: 't',
                    content: 'c',
                    location: {
                        type: 'Point',
                        coordinates: [long1, lat1]
                    }
                };

                console.log('creating');


                var post = new Post(pp);

                post.save(function (err) {
                    console.log('creating?');
                    if (err) {
                        console.log('err:', err);
                        callback(err);
                        return;
                    }
                    console.log('created');
                    callback(null, 'created: ' + i + ':' + j);
                });

            };


            var myFunctionBinded = myFunction.bind(null, cb, i, j);

            calls.push(myFunctionBinded);


        }
    }

    for (var i = 0; i < calls.length; i++) {
        calls[i]();
    }
//    myFunction(function() {}, 1 ,2);
    //async.series(calls);


    console.log('here');


}
function done(err) {
    if (err) console.error(err.stack);
//    mongoose.connection.db.dropDatabase(function () {
//        mongoose.connection.close();
//    });

    mongoose.connection.close();
}