var mongoose = require('mongoose');
var quote = mongoose.model('Quote');

module.exports = {
    display : function(req, res) {
        quote.find({}).sort({ rating : -1}).exec(function(err, quotes) {
            if(err) {
                // console.log(err);
                res.json({ message : 'error',  'data' : err.message });
            } else {  
                // console.log(quotes);
                res.json( { message : 'success' , data : quotes });
            }
        })
    },
    create : function(req, res) {
        // console.log("req.body",req.body);
        var new_quote = new quote({
            content : req.body.content, 
            author : req.body.author,
            rating : req.body.rating
        });
        // console.log("new_quote",new_quote);
        new_quote.save(function(err) {
        if(err) {
            // console.log("error in create quote",err.errors);
            res.json({ message : 'error',  'data' : err.errors});
        } else { 
            res.json({ message : 'success' });
        }
        })
    },

    show : function(req, res) {
        quote.findOne   ({_id : req.params.id},  function(err, quote) {
            if(err) {
                res.json({ message : 'error',  'data' : err.message });
            } else {  
                res.json({ message : 'success', data : quote});
            }
        })
    },

    edit : function(req, res) {
        quote.findOne({ _id: req.params.id }, function (err, quote) {
            if(err) {
                res.json({ message : 'error',  'data' : err.message });
            } else {  
            quote.content = req.body.content;
            quote.author = req.body.author;
            quote.rating = req.body.rating;
        
            quote.save(function(err) {
                if(err) {
                    res.json({ message : 'error',  'data' : err.message });
                } else { 
                    res.json({ message : 'success', data : quote});
                }
            });
            }
        });
    },

    destroy : function(req, res) {
        quote.remove({ _id : req.params.id }, function(err) {
        if (err) {
            res.json({ message : 'error', 'data' : err.message });
        }
        else {
            res.json({ message : 'success', data : quote});
        }
        })  
    }
}