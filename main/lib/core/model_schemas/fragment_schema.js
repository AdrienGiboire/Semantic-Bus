'use strict';

var mongoose = require('mongoose');

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

var FragmentSchema = mongoose.Schema({
  data: Object,
  frags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "fragment"
  }]
}, { minimize: false} );
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

module.exports = FragmentSchema;