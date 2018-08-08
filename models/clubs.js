const mongoose = require('mongoose');

const clubNames = mongoose.Schema({
    name: {type: String, default: ''},
    country : {type: String, default : ''},
    image: {typr : String , default :''},
    fans:[{
        username : {type: String, default: ''},
        email : {type : String , default: ''}
    }]
});

module.exports = mongoose.model('Club',clubNames);