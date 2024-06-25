const express = require('express');
const router = express.Router();
const URL = require('../models/url')

router.get("/", async (req, res) => {
    // if (!req.user) return res.redirect("/");
    const allurls = await URL.find({});
    return res.render("home", {
      urls: allurls,
    });
  });

module.exports = router;
