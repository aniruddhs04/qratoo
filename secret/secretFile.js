module.exports = {

    'facebookAuth' : {
        'clientID'      : '2059205110990921', // your App ID
        'clientSecret'  : '921c1b2495cf3ed3c1867836b2acd6fc', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileURL'    : 'http://localhost:3000/auth/facebook/callback',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {
        'clientID'      : '958012841832-59ebtmdub35p5vibhsce93pjkd5u7ge2.apps.googleusercontent.com',
        'clientSecret'  : 'FProXBbTYw7TZgTcKlSs1ybb',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
