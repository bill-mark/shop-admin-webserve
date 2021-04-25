//用户表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const userSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true,select:false},
    level:{type:Number,required:true},//级别
    jointime:{type:Date,required:false},//入职时间
},{timestamps:true,collection:'users'})

module.exports = model('User',userSchema)