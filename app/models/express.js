//快递公司表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const expressSchema = new Schema({
    __v:{type:Number,select:true},
    name:{type:String,required:true,select:true},
    expressnumber:{type:String,required:false,select:true},//快递单号
    remark:{type:String,required:false},//备注
})

module.export = model('Express',expressSchema)