'use strict'


module.exports = function (_, passport, User, Users, async) {
    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/login', this.login);
            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback', this.facebookLogin);
            router.get('/auth/google', this.getGoogleLogin);
            router.get('/auth/google/callback', this.googleLogin);
            router.get('/contact',this.contact);
            router.get('/features',this.features);
            router.get('/faq',this.faq);
            router.get('/test', this.test);
            router.get('/about',this.about);
            router.get('/services',this.services);

            router.post('/login', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.post('/update', this.updates);
            router.post('/diary',this.diary);
        },
        indexPage: function (req, res) {
            const errors = req.flash('error');
            return res.render('index', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0 });
        },
        login: function (req, res) {
            const errors = req.flash('error');
            return res.render('login');
        },
        contact: function(req,res){
            const errors = req.flash('error');
            return res.render('contact-us');
        },
        features: function(req,res){
            const errors = req.flash('error');
            return res.render('features');
        },
        about: function(req,res){
            return res.render('about');
        },
        services: function(req,res){
            return res.render('services');
        },
        postLogin: passport.authenticate('local-login', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        }),
        postSignUp: passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failiureRedirect: '/login',
            failiureFlash: true
        }),
        getFacebookLogin: passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        }),
        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/user',            
            failiureRedirect: '/login',
            failiureFlash: true
        }), getGoogleLogin: passport.authenticate('google', {
            //  scope: ['profile', 'email'] <=== This Will not require Users permission
            scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] // <=== This will

        }),

        googleLogin: passport.authenticate('google', {
            successRedirect: '/user',            
            failiureRedirect: '/login',
            failiureFlash: true
        }),
        faq: function(req,res){
            res.render('faqs');
        },
        test: function(req,res){
            res.render('test');
        },
        updates: function(req,res){
        async.parallel([
            function(callback){
                console.log(req.body);
                    Users.update({
                        'fullname':req.body.username,
                        'company': req.body.company,
                        'address':req.body.address,
                        'city': req.body.city,
                        'country': req.body.country,
                        'postal': req.body.postal,
                        'aboutme': req.body.aboutme
                    },(err,count)=> {
                        callback(err,count);
                    })
                

            }
        ])
        console.log(req.user);
        res.render('user', {user: req.user});
            
        },
        diary: function(req,res){
            async.parallel([
                function(callback){
                        Users.update({
                            $push: {
                                diary: {
                                    text: req.body.text
                                }
                            }

                        },(err,count)=> {
                            callback(err,count);
                        })

                }
            ])
            res.render('user',  { title: 'Qrato', user: req.user });
        
        }
    }
}