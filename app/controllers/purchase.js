//进货单
const Purchase = require('../models/purchase')
const Commodity = require('../models/commodity')

class PurchaseCtl {
    async create(ctx) {
        ctx.verifyParams({
            intime: { type: 'string', required: true },
        })
        //mongodb默认存0区时间 要加8小时
        ctx.request.body.intime = new Date(Date.parse(ctx.request.body.intime)).getTime() + 8 * 60 * 60 * 1000

        const result = await new Purchase(ctx.request.body).save()

        //console.log(result)

        if (result._id) {
            if (result.goodslist.length > 0) {
                for(const item of result.goodslist){
                    let c_1 = await Commodity.findById(item.commodity)
                    let c_3 = {
                        total: c_1.total + item.count,
                        costprice:c_1.costprice+item.count*item.price
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
        const result = await Purchase.findByIdAndRemove(ctx.request.body.id)
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

        const result = await Purchase.findByIdAndUpdate(ctx.request.body.id, ctx.request.body)
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
        ctx.body = {
            state: 0,
            count:await Purchase.count(),
            data: await Purchase
                .find({ delivery: new RegExp(ctx.query.q) })
                .limit(perPage).skip(page * perPage)
        }
    }
}

module.exports = new PurchaseCtl()