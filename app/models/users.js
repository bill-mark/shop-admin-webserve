//用户表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const userSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:false},
    phone:{type:Number,required:true},
    password:{type:String,required:true,select:false},
    role:{type:String,required:false},//角色
    jointime:{type:Date,required:false},//入职时间
},{timestamps:true})

module.exports = model('User',userSchema)