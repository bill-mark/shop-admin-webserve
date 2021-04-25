//快递公司表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const ecompanySchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String}
},{collection:'ecompany'})

module.exports = model('Ecompany',ecompanySchema)