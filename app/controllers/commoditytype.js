//商品类别
const Commoditytype = require('../models/commoditytype')
const mongoose = require('mongoose')
const Commodity = require('../models/commodity')

class CommoditytypeCtl{
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
        })
        const {name} = ctx.request.body
        const repeated = await Commoditytype.findOne({name})
        if (repeated) {
            ctx.body = {
                state:-1,
                message:'已存在'
            }
            return
        }
        const result = await new Commoditytype(ctx.request.body).save()
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
        const result = await Commoditytype.findByIdAndRemove(ctx.request.body.id)
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
  
        const result = await Commoditytype.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
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
            count:await Commoditytype.count(),
            data:await Commoditytype
            .find({ name: new RegExp(ctx.query.q) })  //正则表达式模糊搜索  key-value 精确搜索
            .limit(perPage).skip(page * perPage)
        }
       
    }

    //查找同商品类别下所有商品
    async getcommoditybysame(ctx){
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1 //乘1用来转数字  max保证不能小于1
        const perPage = Math.max(per_page * 1, 1) //每页多少条
    
        const result = await Commodity.aggregate([
            {
                $match:{commoditytype:mongoose.Types.ObjectId(ctx.query.id) } //匹配指定的商品分类
            },
            {$skip: page },
            {$limit: perPage}, 
            {
                $lookup:{
                    from: 'brand',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'brandlist'
                }
            }   
        ])

        const count_result = await Commodity.aggregate([
            {
                $match:{commoditytype:mongoose.Types.ObjectId(ctx.query.id) }
            },
            {
                $group:{
                    _id:"$commoditytype",
                    count:{$sum:1}
                }
            }
            
        ])

        if(!result){
           ctx.throw(404,'分类不存在')
        }
        ctx.body = {
            state:0,
            count:count_result,
            data:result
        }
    }


   //增加成员  增加商品可参考
  async addUser(ctx) {
    ctx.verifyParams({
      departmentid: { type: "string", required: true },
      userid: { type: "string", required: true },
    });

    let d_1 = await Department.findById(ctx.request.body.departmentid);

    let d_2 = await d_1.useres.push(ctx.request.body.userid);
    // console.log(d_2)

    if (d_2) {
      let d_3 = await d_1.save();
      // console.log(d_3)

      if (d_3) {
        ctx.body = {
          state: 0,
        };
      }
    }
  }

   
}

module.exports = new CommoditytypeCtl()