const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {secret} = require('../config')
const auth = jwt({secret})

const{create,login,findall,delete:del,update,getdetail} = require('../controllers/users')

//注册
router.post('/create', create)
//登录
router.post('/login',login)
//查找
router.get('/findall',findall)
//删除
router.post('/delete',del)
//更新用户
router.post('/update',update)
//查看单一详情
router.get('/getdetail',getdetail)

module.exports = router