const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const {secret} = require('../config')
const auth = jwt({secret})

const{create,login,findall,delete:del} = require('../controllers/users')

//注册
router.post('/create', create)
//登录
router.post('/login',login)
//查找
router.get('/findall',findall)
//删除
router.post('/delete',del)

module.exports = router