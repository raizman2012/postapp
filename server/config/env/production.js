'use strict';

module.exports = {
    db: 'mongodb://raizman_leonid:leonidr2014@kahana.mongohq.com:10077/app27488684',
    app: {
        name: 'post near you'
    },
    facebook: {
        clientID: '641796912562834', //'APP_ID',
        clientSecret: '52146ab13cce4ebb0c29c36312d3ff97', //'APP_SECRET',
        callbackURL: 'http://streetpost.herokuapp.com/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
