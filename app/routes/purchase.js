const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/purchase'})
const {secret} = require('../config')
const auth = jwt({secret})

const {create,delete:del,update,findall,getdetail,getdetail_no_populate} = require('../controllers/purchase')


router.post('/create',create)
router.post('/delete',del)
router.post('/update',update)
router.get('/findall',findall)
router.get('/getdetail',getdetail)
router.get('/getdetail_no_populate',getdetail_no_populate)

module.exports = router