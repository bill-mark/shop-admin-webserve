const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/purchase'})
const {secret} = require('../config')
const auth = jwt({secret})

const {create,delete:del,update,findall} = require('../controllers/purchase')


router.post('/create',create)
router.post('/delete',del)
router.post('/update',update)
router.get('/findall',findall)

module.exports = router