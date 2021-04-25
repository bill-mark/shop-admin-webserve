//订单表
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema({
    __v: { type: Number, select: true },
    state: { type: Number, select: true },//订单状态 1待付款,2待发货,3已发货,4已付款,5有尾款,6已收货,7其他
    sum: { type: Number },//金额
    ordertime: { type: Date, required: true },//下单时间
    address: { type: String, required: true },//收货地址
    commoditys: {
        type: [
            {
                commodity:{type:Schema.Types.ObjectId,ref:'Commodity'},
                count: { type: Number,required:true},//数量
                price:{type:Number,required:true},//卖出单价
            }
        ],
        select: true
    },//商品列表
    customer: {
        type: Schema.Types.ObjectId,
         ref: 'Customer',
        select: true
    },//外键-客户表
    express: {
        type: Schema.Types.ObjectId,
        ref: 'Ecompany',
        required: false
    },//快递公司
    postid:{
        type:String,
        required: false
    },//快递单号
    postprice:{
        type:Number,
        required: false
    },//快递费
    remark: { type: String, required: false },//备注
},{collection:'order'})

module.export = model('Order', orderSchema)