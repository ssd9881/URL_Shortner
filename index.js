const express = require('express')
const app = express();
const path = require('path')
const port = 8100
const cookieParser = require("cookie-parser");
const {connectMongoDB} = require('./connect')
const URL = require('./models/url')
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const UrlRoute = require('./routes/url')
const staticRouter = require('./routes/staticrouter')
const userRoute = require("./routes/user");
//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);
//Mongo connection
connectMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("MongoDB connected"))

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))

app.get('/test',async(req,res)=>{
    const allURLS = await URL.find({})
    return res.render('home',{
        urls: allURLS
    })
})
// routes
app.use("/url",restrictTo(['Normal']), UrlRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);
app.get('/:shortid',async (req,res)=>{
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortID: shortid },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
    if (entry) {
        res.redirect(entry.redirectUrl);
    } else {
        res.status(404).send('URL not found');
    }
})

app.listen(port,()=>console.log(`Server started at port ${port}`))