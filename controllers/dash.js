module.exports = function(Users,async){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.profile);
            router.get('/logout',this.logout);
            router.get('/icons', this.icons);
            router.get('/maps', this.maps);
            router.get('/notifications', this.notif);
            router.get('/table', this.table);
            router.get('/template', this.template);
            router.get('/typography', this.typography);
            router.get('/upgrade', this.upgrade);
            router.get('/user', this.user);
            
        },
        profile: function(req,res){
            res.render('dashboard',  { title: 'Qrato', user: req.user });
        },
        icons: function(req,res){
            res.render('icons',  { title: 'Qrato', user: req.user });
        },
        maps: function(req,res){
            res.render('maps',  { title: 'Qrato', user: req.user });
        },
        notif: function(req,res){
            res.render('notifications',  { title: 'Qrato', user: req.user });
        },
        table: function(req,res){
            res.render('table',  { title: 'Qrato', user: req.user });
        },
        template: function(req,res){
            res.render('template',  { title: 'Qrato', user: req.user });
        },
        typography: function(req,res){
            res.render('typography',  { title: 'Qrato', user: req.user });
        },
        upgrade: function(req,res){
            res.render('upgrade',  { title: 'Qrato', user: req.user });
        },
        user: function(req,res){
            res.render('user',  { title: 'Qrato', user: req.user });
        },
        logout: function(req,res){
            req.logout();
            res.redirect('/');
        }
    }
}