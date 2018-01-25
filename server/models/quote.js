// require mongoose
var mongoose = require('mongoose');
// create the schema
var QuoteSchema = new mongoose.Schema({
    content: { type: String, required: [true, 'Quote is required'], minlength: [4,'Quote content of minimum of 4 chars required']},
    author: { type: String, required: [true, 'Author Name is required'], minlength: [1,'Author Name cannot be empty']},
    rating: { type: Number, default : 0},
    created_at: { type: Date, default : Date.now() },
    updated_at: { type: Date, default : Date.now() }
  });

mongoose.model('Quote', QuoteSchema);
