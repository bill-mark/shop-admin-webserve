//生产商表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const producerSchema = new Schema({
    __v:{type:Number,select:true},
    name:{type:String,required:true,select:true},
    remark:{type:String,required:false},//备注
})

module.export = model('Producer',producerSchema)