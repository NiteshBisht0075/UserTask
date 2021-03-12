const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const User = require('./models/User');
// const json = require('koa-json');
require('./db/conn')

const app = new Koa();
const router = new Router();
const port = 8000 ;
// app.use(json())


// add users in db
router.post('/users',async(ctx, next) => {
    
try{
    var body = ctx.request.body;
    var user = new User();
    user.name=body.name;
    user.email=body.email;
    user.save();
    // console.log(user);
    ctx.body= {status: 200, message: "data save ",user : user} 
}
catch(error){
    ctx.throw(error)
}
});

// read users
router.get('/users',async(ctx,next)=>{
    
    try{
        var usersData = await User.find()
        console.log(usersData)
        ctx.body ={usersData}
    }
    catch(error){
        ctx.throw(error)
    }
})
// update the user detail using id
router.put('/users/:id', async(ctx,next)=>{
    try{
        var _id = ctx.request.params.id;
        
        var updateUser = await User.findByIdAndUpdate(_id, ctx.request.body)
        ctx.body={updateUser}
    }
    catch(error){
        ctx.throw(error)
    }
})

// get user by id
router.get("/users/:id", async(ctx,next) => {

    try{
        const _id = ctx.request.params.id;
        const userData = await User.findById(_id);
        // console.log(userData);
        if(!userData){
            return ctx.body;
        }
        else{
            ctx.body={userData};
        }
    }
    catch(error){
        ctx.throw(error);
    }
})




app.use(koaBody({ multipart: true }))

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(port,() =>{
console.log(`${port}`)
})