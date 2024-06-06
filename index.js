const express = require('express')
const app = express();
const UrlRoute = require('./routes/url')
const port = 8100
const {connectMongoDB} = require('./connect')
const URL = require('./models/url')

//Middleware
app.use(express.json())

//Mongo connection
connectMongoDB('mongodb://localhost:27017/short-url').then(()=>console.log("MongoDB connected"))

//routes
app.use('/url',UrlRoute)
app.get('/:shortid',async (req,res)=>{
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortID: shortid },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
    res.redirect(entry.redirectUrl)
})

app.listen(port,()=>console.log(`Server started at port ${port}`))