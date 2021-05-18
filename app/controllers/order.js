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

       
        //更新商品总数等
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

        // console.log(ctx.request.body)
        //更新对应商品总数和总价
        let d_1 = await Order.findById(ctx.query.id)
        console.log(d_1)

        if (ctx.request.body.goodslist && ctx.request.body.goodslist.length > 0) {
            for(const item of ctx.request.body.goodslist){
                let c_1 = await Commodity.findById(item.commodity)

                let old_count = 0
                let f_1 = d_1.goodslist.findIndex(item_f =>{
                    return item_f.commodity == item.commodity
                })
                if(f_1 > -1){
                    old_count=d_1.goodslist[f_1].count
                }

                let c_2 = c_1.costprice/c_1.total  //进货平均单价
                   

                let c_3 = {
                    total: c_1.total - item.count + old_count,
                    costprice:c_1.costprice-item.count*c_2 + old_count*c_2
                }
                await Commodity.findByIdAndUpdate(item.commodity, c_3)
            }
        }

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
            count:await Order.count(),
            data: c_1
        }
    }

    async getdetail(ctx){
        const result = await Order.findById(ctx.query.id)
        .populate({path:'customer'})
        .populate({path:'ecompany',model:ecompany})
        .populate({path:'goodslist',populate:{path:'commodity',model:Commodity,populate:{path:'brand commoditytype'} }}  )
        if(!result){
           ctx.throw(404,'不存在')
        }
        ctx.body = {
            state:0,
            data:result
        }
    }

    //非多层填充
    async getdetail_no_populate(ctx){
        const result = await Order.findById(ctx.query.id)
        .populate({path:'customer'})
        .populate({path:'ecompany',model:ecompany})
        if(!result){
           ctx.throw(404,'不存在')
        }
        ctx.body = {
            state:0,
            data:result
        }
    }
}

module.exports = new OrderCtl()