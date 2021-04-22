//商品表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const commoditySchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true},
    brand:{
        type:[{type:Schema.Types.ObjectId,ref:'Brand'}],
        select:true
    },//品牌
    commoditytype:{
        type:[{type:Schema.Types.ObjectId,ref:'Commoditytype'}],
        select:true
    },//商品类别
    producer:{
        type:[{type:Schema.Types.ObjectId,ref:'Producer'}],
        select:false
    },//外键-生产商
    total:{type:Number,required:false},//总数
    costprice:{type:Number},//进货总价
})

module.exports = model('Commodity',commoditySchema)