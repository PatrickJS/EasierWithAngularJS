var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    express = require('express');

/*
    Database
*/

var mongoose =
  require('mongoose')
    .connect('mongoosedb://localhost:27017/angular-resource'),
    db = mongoose.connection;

mongoose.set('degub', true);

db
  .on('error', console.error.bind(console, 'Connection Error.'))
  .once('open', console.log.bind(console, 'We have connected.'));

// Schemas

var contactSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
    clean: { type: String, unique: true }
  },
  email: String,
  number: String,
  added: Date
});

contactSchema
  // Index on important fields
  .index({ name: { last: 1, clean: 1 }, email: 1})
  // Make sure document has 'added' field when first saved
  .pre('save', function(next) {
    if (!this.added) {
      this.added = new Date();
      this.name.clean = (this.name.first + '-' + this.name.last).toLowerCase();
      next();
    }
  })
  // Set up Virtual full name field
  .virtual('name.full')
    // Concatenate first and last name
    .get(function() {
      return this.name.first + ' ' + this.name.last;
    })
    // Split full name up when added
    .set(function(name) {
      var split = name.trim().split(' ');
      this.name.first = split[0];
      this.name.last = split[1];
      this.name.clean = split.join('-').toLowerCase();
    });

// Models

var Contact = mongoose.model('Contact', contactSchema);

/*
        Server
*/
var app =
express()
  .set('port', process.env.PORT || 3000)
  // the route base is ../app
  .set('views', path.resolve(__dirname, '../app'))
  // Render html by just splitting the file out
  .set('view engine', 'html')
  .engine('html', function(path, options, fn) {
    if (typeof options === 'function') {
      fn = options, options = {};
    }
    fs.readFile(path, 'utf8', fn);
  })
  .use(express.favicon())
  .use(express.bodyParser())
  .use(express.logger('dev'))
  //serve the app folder statically
  .use(express.static(path.resolve(__dirname, '../app')));
// setup Server

app
  .get('api/contact', function(req, res, next) {
    Contact
      .find()
      .sort('name.last')
      .exec(function(err, contacts) {
        if (err) return next(err);
        res.send(contacts);
      });
  })
  .get('api/contact', function(req, res, next) {
    Contact
      .findOne({ 'name.clean': req.params.name })
      .exec(function(err, contact) {
        if (err) return next(err);
        res.send(contact);
      });
  })
  .post('api/contact', function(req, res, next) {
    // Create our new contact
    var contact = new Contact({
      name: {
        full: req.body.name
      },
      email: req.body.email,
      number: req.body.number
    });
    res.save(contact);
  });
