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
            router.get('/form1',this.form1);
            router.get('/form2',this.form2);
            router.get('/form3',this.form3);
            router.get('/form4',this.form4);
            router.get('/form5',this.form5);
            router.get('/form6',this.form6);
            router.get('/form7',this.form7);
            router.get('/form8',this.form8);
            router.get('/form9',this.form9);
            router.get('/privacy',this.privacy);
            router.get('/terms',this.terms);
            router.get('/pricing',this.pricing);

            router.post('/login', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.post('/update', this.updates);
            router.post('/diary',this.diary);
            router.post('/form1',this.Postform1);
            router.post('/form2',this.Postform2);
            router.post('/form3',this.Postform3);
            router.post('/form4',this.Postform4);
            router.post('/form5',this.Postform5);
            router.post('/form6',this.Postform6);
            router.post('/form7',this.Postform7);
            router.post('/form8',this.Postform8);
            router.post('/form9',this.Postform9);

        },
        indexPage: function (req, res) {
            const errors = req.flash('error');
            var a = "Login|Register";
            var b = "login"
                    if(req.user) {
                        a= "Hi, "+req.user.username;
                        b="user"    
                    }
        return res.render('index', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0, a: a,b:b });
        },
        login: function (req, res) {
            const errors = req.flash('error');
            return res.render('login');
        },
        contact: function(req,res){
            const errors = req.flash('error');
            var a = "Login|Register";
            var b = "login"
                    if(req.user) {
                        a="Hi, "+req.user.username;
                        b="user"    
                    }
        return res.render('contact-us', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0, a: a,b:b });
        },
        features: function(req,res){

            const errors = req.flash('error');
            var a = "Login|Register";
            var b = "login"
                    if(req.user) {
                        a="Hi, "+req.user.username;
                        b="user"    
                    }
        return res.render('features', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0, a: a,b:b });
        },
        about: function(req,res){

            const errors = req.flash('error');
            var a = "Login|Register";
            var b = "login"
                    if(req.user) {
                        a="Hi, "+req.user.username;
                        b="user"    
                    }
        return res.render('about', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0, a: a,b:b });        },
        services: function(req,res){

            const errors = req.flash('error');
            var a = "Login|Register";
            var b = "login"
                    if(req.user) {
                        a= "Hi, "+req.user.username;
                        b="user"    
                    }
        return res.render('services', { title: 'Qrato', messages: errors, hasErrors: errors.length > 0, a: a,b:b });
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
                                    text: req.body.text,
                                    date: req.body.date
                                }
                            }

                        },(err,count)=> {
                            callback(err,count);
                        })

                }
            ])
            res.render('typography',  { title: 'Qrato', user: req.user });
        
        },
        form1: function(req,res){
            res.render('forms/form1');
        },
        form2: function(req,res){
            res.render('forms/form2');
        },
        form3: function(req,res){
            res.render('forms/form3');
        },
        form4: function(req,res){
            res.render('forms/form4');
        },
        form5: function(req,res){
            res.render('forms/form5');
        },
        form6: function(req,res){
            res.render('forms/form6');
        },
        form7: function(req,res){
            res.render('forms/form7');
        },
        form8: function(req,res){
            res.render('forms/form8');
        },
        form9: function(req,res){
            res.render('forms/form9');
        },
        Postform1: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            phoneNumber: req.body.contact,
                            EducationLevel: req.body.education
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            if(req.body.education=="High School Level or Senior Secondary Level (10th or 12th)"){
            res.render('forms/form5', {email: req.body.email});
            }else if(req.body.education=="Undergraduate University Level"){
            res.render('forms/form2', {email: req.body.email});
            }else if(req.body.education=="Postgraduate University Level"){
                res.render('forms/form3', {email: req.body.email});
            }
            else if(req.body.education=="Employed Professional"){
                res.render('forms/form4', {email: req.body.email});
            }
        },
        Postform2: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            Underdegree: req.body.Underdegree,
                            Understream: req.body.Understream,
                            Undercourses: req.body.Undercourses
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form5', {email: req.body.email});
        },
        Postform3: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            Postdegree: req.body.Postdegree,
                            Poststream: req.body.Poststream,
                            Postcourses: req.body.Postcourses
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form2', {email: req.body.email});
        },
        Postform4: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            experienceEmployedProfessional: req.body.experienceEmployedProfessional,
                            venturesEmployement: req.body.venturesEmployement
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form3', {email: req.body.email});
        },
        Postform5: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            VenturesPursuing: req.body.VenturesPursuing,
                            PursuitsDescription: req.body.PursuitsDescription
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form6', {email: req.body.email});
        },
        Postform6: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            ActivitiesInterest: req.body.ActivitiesInterest,
                            ExtraContests: req.body.ExtraContests,
                            GroupActivities: req.body.GroupActivities
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form7', {email: req.body.email});
        },
        Postform7: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            communityService: req.body.communityService,
                            communityDevelopment: req.body.communityDevelopment,
                            CommunityActivities:req.body.CommunityActivities
            
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('forms/form8', {email: req.body.email});
        },
        Postform8: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            CVUtility: req.body.CVUtility,
                            FutureOptions: req.body.FutureOptions,
                            Miscellaneous: req.body.Miscellaneous
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
            res.render('/');
        },
        Postform9: function(req,res){
            console.log(req.body.education);
            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            NewApplication: req.body.NewApplication,
                            Corporation: req.body.Corporation
                        },(err,count)=> {
                            callback(err,count);
                        })
                    }
                }
            ])
            res.render('/');
        },
        privacy: function(req,res){
            res.render(`privacypolicy`);
        },
        terms: function(req,res){
            res.render('tnc');
        },
        pricing: function(req,res){
            res.render('pricing');
        }
          
    }
}