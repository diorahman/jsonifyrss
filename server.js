var request = require("request")
var fastFeed = require("fast-feed")
var express = require("express")
var server = express()

var likes = {}

server.use(express.bodyParser())

var types = {
  news : "http://detik.feedsportal.com/c/33613/f/656083/index.rss",
  nasional : "http://detik.feedsportal.com/c/33613/f/656083/index.rss",
  internasional : "http://detik.feedsportal.com/c/33613/f/656086/index.rss",
  hot : "http://rss.detik.com/index.php/hot"
}

server.get("/detik/:type", function(req, res) {
  if (!types[req.params.type]) return res.send({ error : 'news, nasional, internasional, hot'})
  request(types[req.params.type], function(a,b,c){
    fastFeed.parse(c, function(err, obj) {
      if (err) return res.send({ error : err. message })
      res.send({ data : obj, likes : likes })
    })
  })
})

server.post("/like", function(req, res){
  var body = req.body
  if (Object.keys(types).indexOf(body.type) > -1) {
    likes[body.type] = likes[body.type] ? (likes[body.type] + 1) : 1
    return res.send(likes)
  }
  return res.send({ error : 'news, nasional, internasional, hot'})
})

server.listen(3000)

