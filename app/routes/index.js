const fs = require('fs')
module.exports = (app)=>{
    let c_1 = fs.readdirSync(__dirname)
    c_1.forEach(file =>{
        if(file === 'index.js'){
            return
        }
        const route = require(`./${file}`)
        //console.log(route)
        //allowedMethods 支持没有的方法返回405 比如put, 不支持的方法返回501 比如link
        app.use(route.routes()).use(route.allowedMethods())
    })
}