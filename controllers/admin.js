'use strict';

//const path = require('path');
//const fs = require('fs');

module.exports = function (formidable,Users, aws, async) {
    return {
        SetRouting: function (router) {
            router.get('/admin', this.adminPage);
            router.get('/:name',this.error);

            router.post('/uploadFile',aws.Upload.any(), this.uploadFile);
            router.post('/admin',this.adminPostPage);
        },

        adminPage: function (req, res) {
            res.render('admin/admin');
        },
        adminPostPage: function(req,res){

            async.parallel([
                function(callback){
                    if(req.body.email){
                        Users.update({
                            'email':req.body.email
                        },{
                            $push: {
                                files: {
                                    file: req.body.filename,
                                    type: req.body.type,
                                    date: req.body.date
                                }
                            }

                        },(err,count)=> {
                            callback(err,count);
                        })
                    }

                }
            ])
                res.render('admin/admin');
        },

        uploadFile: function (req, res) {
            const form =new  formidable.IncomingForm();
            //form.uploadDir = path.join(__dirname, '../public/uploads');

            form.on('file', (field, file)=>{
              //  fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
                //    if(err) throw err;
                  //  console.log('File renamed successfully');
//                })
            });

            form.on('error',(err)=>{
                console.log(err);
            });
            form.on('end',()=>{
                console.log('File upload is Successful');
            });

            form.parse(req);
        },
        error: function(req,res){
            res.render('error')
        }
    }
}