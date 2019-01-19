//creating model and schemas:

mongoose = require('mongoose');

var schema = mongoose.Schema;

var userInfoSchema = new schema({
    firstName :{
        type:String,
        required:true
    } ,
    lastName : {
        type:String,
        required:true
    },
    EmpId : {
        type:Number,
        required:true
}
});

var userInfoModel = mongoose.model('userInfoModel',userInfoSchema);

//exporting model
module.exports = userInfoModel;