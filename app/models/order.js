//订单表
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema({
    __v: { type: Number, select: true },
    state: { type: Number, select: true },//订单状态 1待付款,2待发货,3已发货,4已付款,5有尾款,6已收货,7其他
    sum: { type: Number },//金额
    ordertime: { type: Date, required: true },//下单时间
    receivetime: { type: Date, required: false },//预计收货时间
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
        type: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
        select: true
    },//外键-客户表
    sender: {
        type: String,
        required: false
    },//送货人
    remark: { type: String, required: false },//备注
})

module.export = model('Order', orderSchema)