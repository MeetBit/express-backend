var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(`RUNNING ${process.env.npm_package_name} v${process.env.npm_package_version} on PORT ${process.env.PORT}`)
});

module.exports = router;
