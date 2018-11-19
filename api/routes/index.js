var express = require('express');
var router = express.Router();
const request = require('request');

// query Ripple blockchain for ledger validation count
router.get('/', function(req, res, next) {
  request.post({
    url: 'http://s1.ripple.com:51234',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"method": "server_info","params": [{}]}),
  }, (err, results, body) => {
    if (err) {
      return res.status(500).send({message: 'Please check your internet connection.'})
    }
    return res.send(body);
  });
});

module.exports = router;
