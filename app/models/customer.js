//客户表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const customerSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:false},
    phone:{type:Number,required:false},
    address:{type:String,required:false},
    company:{
        type:[{type:Schema.Types.ObjectId,ref:'Company'}],
        select:true
    },//外键-公司
    remark:{type:String,required:false},//备注
})

module.exports = model('customer',customerSchema)