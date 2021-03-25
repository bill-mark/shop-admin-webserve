//商品表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const commoditySchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:false},
    producer:{
        type:[{type:Schema.Types.ObjectId,ref:'Producer'}],
        select:false
    },//外键-生产商
    total:{type:Number,required:false},//总数
    producetime:{type:Date,required:false},//生产时间
    intime:{type:Date,required:false},//入库时间
    outtime:{type:Date,required:false},//出库时间
    inprice:{type:Double,required:false},//进货单价
    outprice:{
        type:[{

        }],
        select:false
    },//出货单价
    
})

module.exports = model('Commodity',commoditySchema)