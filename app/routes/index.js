const fs = require('fs')
module.exports = (app)=>{
    let c_1 = fs.readdirSync(__dirname)
    c_1.forEach(file =>{
        if(file === 'index.js'){
            return
        }
        const route = require(`./${file}`)
        app.use(route.routes()).use(route.allowedMethods())
    })
}