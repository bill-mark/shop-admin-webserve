//品牌
const Brand = require('../models/brand')
const mongoose = require('mongoose')

class BrandCtl{
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
        })
        const {name} = ctx.request.body
        const repeated = await Brand.findOne({name})
        if (repeated) {
            ctx.body = {
                state:-1,
                message:'已存在'
            }
            return
        }
        const result = await new Brand(ctx.request.body).save()
        if(result._id){
            ctx.body = {
                state:0,
            }
        }  
    }
    async delete(ctx){
        ctx.verifyParams({
            id:{type:'string',required:true},
         })
        const result = await Brand.findByIdAndRemove(ctx.request.body.id)
        if(!result){
            ctx.body = {
                state:-1,
                message:'目标不存在'
            }
            return
        }
        ctx.body = {
            state:0,
        }
    }
    async update(ctx){
        ctx.verifyParams({
           name:{type:'string',required:true},
           id:{type:'string',required:true},
        })
  
        const result = await Brand.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
        if(!result){
            ctx.body = {
                state:-1,
                message:'目标不存在'
            }
            return
        }
        ctx.body = {
            state:0,
        }
    }
    async findall(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1 //乘1用来转数字  max保证不能小于1
        const perPage = Math.max(per_page * 1, 1) //每页多少条
        ctx.body = {
            state:0,
            count:await Brand.count(),
            data:await Brand
            .find({ name: new RegExp(ctx.query.q) })  //正则表达式模糊搜索  key-value 精确搜索
            .limit(perPage).skip(page * perPage)
        }
    }

    async getbrandbysame(ctx){
    
        const result = await Brand.aggregate([
            {
                $match:{_id:mongoose.Types.ObjectId(ctx.query.id) }
            },
            {
                $lookup:{
                    from:"brand",
                    localField:"_id",
                    foreignField:"commoditytype",
                    as:"brandlist"
                }
            }
            
        ])

        if(!result){
           ctx.throw(404,'品牌不存在')
        }
        ctx.body = {
            state:0,
            data:result
        }
    }
}

module.exports = new BrandCtl()