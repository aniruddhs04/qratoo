
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
        type: {type: String,default: ''},
        date:{type: String,default: ''}
    }],
    diary: [{
        text: { type: String, default: ''},
        date: {type: String, default: ''}
    }],
    cv: { type: String, format: Date ,default: '' },
    sop: { type: String, format: Date ,default: '' },
    pe: { type: String, format: Date ,default: '' },
    paymentCV: {type: String, default: '0'},
    paymentSOP: {type: String, default: '0'},
    paymentPE: {type: String, default: '0'},
    phoneNumber: {type: String,default: ''},
    EducationLevel : {type:String, default: ''},
    ResidentialAddress: {type: String,default: ''},
    Underdegree: {type: String,default: ''},
    Understream: {type: String,default: ''},
    Undercourses: {type: String,default: ''},
    Postdegree: {type: String,default: ''},
    Poststream: {type: String,default: ''},
    Postcourses: {type: String,default: ''},
    experienceEmployedProfessional: {type: String,default: ''},
    venturesEmployement: {type: String, default: ''},
    PursuitsDescription: {type: String, default: ''},
    VenturesPursuing: { type: String, default: ''},
    CommunityActivities: {type: String, default: ''},
    communityService: {type:  String, default: ''},
    communityDevelopment: {type: String, default: ''},
    CVUtility: {type: String, default: ''},
    FutureOptions: {type: String, default: ''},
    Miscellaneous: {type: String, default: ''},
    Corporation: {type:String, default: ''},
    NewApplication: {type:String,default: ''}
});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validUserPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);