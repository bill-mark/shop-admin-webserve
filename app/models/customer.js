//客户表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const customerSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true},
    phone:{type:Number,required:false},
    address:{type:String,required:false},
    remark:{type:String,default:'',required:false},//备注
},{collection:'customer'})

module.exports = model('customer',customerSchema)