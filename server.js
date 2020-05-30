const Koa = require('koa')
const Router = require('koa-router')
const monto = require('monto')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const mongoose = require('mongoose')

// path
const fs = require('fs')
const path = require('path')

// mongodb
const db = monto("mongodb://localhost/cms")
db.connection(function(){
    console.log("connect successful!")
})
const app = new Koa()
const router = new Router()

// 设置全局变量
let imageUrl = ''

app.use(bodyParser())
app.use(serve('./asset'))
// 跨域处理
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
    await next()
})
app.use(router.routes()).use(router.allowedMethods())

// router
// 返回全部商品数据
router.get('/commodity', async ctx => {
    var data = await db.findMany("commodity",{}, true)
    ctx.body = data
})
// 接收增加商品
router.post('/addcommodity', async ctx => {
    var { title, image, desc, price } = ctx.request.body
    var name = image.file.name
    var base = imageUrl.replace(/^data:image\/\w+?;base64,/, "")
    var base64 = Buffer.from(base,"base64")
    fs.writeFile(path.join(__dirname, 'asset', name), base64, () => {
        console.log(name+' has been successfully stored in /asset')
        imageUrl = ''
    })
    var commodity = { image: 'http://localhost:3000/'+name, title, desc, price,  }
    // console.log(commodity)
    db.insertOne("commodity", commodity).then(function(){
        console.log("commodity have been stored in the database!")
    })
    ctx.body = 'server has received commodity...'
})

router.post('/addcommodity_avatar', async ctx => {
    imageUrl = ctx.request.body.imageUrl
    ctx.body = 'server has received the picture...'
})

// 更新商品
router.post('/updatecommodity', async ctx => {
    console.log(ctx.url)
    var body = ctx.request.body
    // console.log(body)
    if(Object.getOwnPropertyNames(body).length > 1){
        var _id = body._id
        var param  = {}
        for(let p in body){
            if(p !== '_id'){
                param[p] = body[p]
            }
        }
        // console.log(param)
        db.updateOne("commodity",{
            _id: mongoose.Types.ObjectId(_id)
        },{$set: param}).then(function(){
            console.log("database has successfully updated the commodity data!")
        })
    }
    ctx.body = 'server has received the updated data...'
})

// 删除商品
router.post('/deletecommodity', async ctx => {
    var _id = ctx.request.body._id
    db.deleteOne('commodity', {
        _id: mongoose.Types.ObjectId(_id)
    }).then(function(){
        console.log("database has successfully removed the commodity data!")
    })
    ctx.body = 'commodity has been removed from the database...'
})

// 查询商品
router.post('/querycommodity', async ctx => {
    var search = ctx.request.body.search.split(/\s+/g)
    var data = await db.findMany("commodity",{}, true)
    var querydata = data.filter(el => {
        var f = true
        search.forEach(element => {
            // 是文字
            if(Number.isNaN(parseInt(element))){
                var reg = new RegExp(element, "g")
                f = reg.test(el.title)
            }else{
                // 是数字
                if(parseInt(el.price) >= parseInt(element)){
                    f = true && f
                }else{
                    f = false
                }
            }
        });
        return f
    })
    ctx.body = querydata
})

// 将http服务器设置在3000端口
app.listen(3000, function(){
    console.log('server is running at http://localhost:3000')
})