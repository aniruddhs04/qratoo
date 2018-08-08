
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    fullname: { type: String, unique: true, default: '' },
    email: { type: String, unique: true },
    password: { type: String, unique: false, default: '' },
    userImage: { type: String, default: 'default.png' },
    facebook: { type: String, default: '' },
    fbTokens: { type: Array, unique: true },
    google: { type: String, unique: true, default: '' },
    contact: { type: String, default: '' },
    DOB: { type: String, default: '' },
    emp: { type: String, default: '' },
    gender: { type: String, default: '' },
    profemail: { type: String, default: '' },
    address: {type:String,default: 'B-32,Parkour Street'},
    city: {type: String, default: 'Kolkata'},
    country: {type:String, default: 'India'},
    postal: {type: String,default: '000000'},
    aboutme: {type:String,default:'Honey, look at them legs.'},
    company: {type:String, default: ''},
    files: [{
        file: { type: String, default: '' },
        type: {type: Date,default: ''}
    }],
    diary: [{
        text: { type: String, default: ''},
        date: {type: Date, default: ''}
    }],
    cv: { type: String, format: Date ,default: '' },
    sop: { type: String, format: Date ,default: '' },
    pe: { type: String, format: Date ,default: '' }
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validUserPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);