const shortid =  require('shortid')
const URL = require('../models/url')

async function handleGenerateShortId(req,res){

    const shortID = shortid();

    if(!req.body.URL) return res.status(400).json({error:"URL is required"})
    await URL.create({
        shortID: shortID,
        redirectUrl: req.body.URL,
        visitHistory:[]
    })
    return res.render('home', {
        id:shortID
    })
    // return res.json({id:shortID})
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID})
    if (!result) {
        return res.status(404).json({ error: "Short ID not found" });
    }
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handleGenerateShortId,
    handleGetAnalytics
}