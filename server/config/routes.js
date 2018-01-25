var quote = require('../controllers/quotes.js');

module.exports = function(app) {
  //=========================='GET' http://company.com/======================//
    app.get('/', function(req, res) {
      res.send("Welcome to my first API")
  })
  //=========================='GET' http://company.com/quotes======================//
  app.get('/quotes', function(req, res) {
    quote.display(req,res);
  })
  //=========================='GET' http://company.com/quote/7======================//
  app.get("/quotes/:id", function (req, res)  { 
    quote.show(req,res);
  })
  //=========='POST' http://company.com/quotes(New quote Object Included)=========//
  app.post("/quotes", function (req, res) { 
    quote.create(req,res);
  })
  //======	'PUT' http://company.com/quote/7(Updated quotes Object Included)=======//
  app.put("/quotes/:id",function  (req, res)  { 
    quote.edit(req,res);
  })
  //==============='DELETE' http://company.com/quotes/7==========================//
  app.delete('/quotes/:id', function (req, res) { 
    quote.destroy(req,res);
  })
  //==============='ALL other routes' http://company.com/xxxxxx==========================//
  app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
  });
}