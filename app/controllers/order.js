//订单
const Order = require('../models/order')
const Commodity = require('../models/commodity')

const ecompany = require('../models/ecompany')

class OrderCtl {
    async create(ctx) {
        //mongodb默认存0区时间 要加8小时
        if(ctx.request.body.ordertime){
            ctx.request.body.ordertime = new Date(Date.parse(ctx.request.body.ordertime)).getTime() + 8 * 60 * 60 * 1000
        }else{
            ctx.request.body.ordertime = new Date().getTime() + 8 * 60 * 60 * 1000
        }

        const result = await new Order(ctx.request.body).save()

        //console.log(result)

        if (result._id) {
            if (result.goodslist.length > 0) {
                for(const item of result.goodslist){
                    let c_1 = await Commodity.findById(item.commodity)
                    let c_2 = c_1.costprice/c_1.total  //进货平均单价
                    let c_3 = {
                        total: c_1.total - item.count,
                        costprice:c_1.costprice-item.count*c_2
                    }
                    await Commodity.findByIdAndUpdate(item.commodity, c_3)
                }
            }

            ctx.body = {
                state: 0,
            }
        }
    }
    async delete(ctx) {
        ctx.verifyParams({
            id: { type: 'string', required: true },
        })
        const result = await Order.findByIdAndRemove(ctx.request.body.id)
        if (!result) {
            ctx.body = {
                state: -1,
                message: '目标不存在'
            }
            return
        }
        ctx.body = {
            state: 0,
        }
    }
    async update(ctx) {
        ctx.verifyParams({
            id: { type: 'string', required: true },
        })

        const result = await Order.findByIdAndUpdate(ctx.request.body.id, ctx.request.body)
        if (!result) {
            ctx.body = {
                state: -1,
                message: '目标不存在'
            }
            return
        }
        ctx.body = {
            state: 0,
        }
    }
    async findall(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1 //乘1用来转数字  max保证不能小于1
        const perPage = Math.max(per_page * 1, 1) //每页多少条
        let c_1 = await Order
        .find()
        .populate({path:'customer'})
        .populate({path:'ecompany',model:ecompany})
        .populate({path:'goodslist',populate:{path:'commodity',model:Commodity}})
        .limit(perPage).skip(page * perPage)
        
        ctx.body = {
            state: 0,
            data: c_1
        }
    }
}

module.exports = new OrderCtl()