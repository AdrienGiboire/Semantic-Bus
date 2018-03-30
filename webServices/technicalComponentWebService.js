
var mlab_token = require('../configuration').mlab_token
var componentsCategoriesTree = require('./componentsCategoriesTree')

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


module.exports = function(router, app) {

  // --------------------------------------------------------------------------------

  var technicalComponentDirectory = require('./technicalComponentDirectory.js');
  var recursivPullResolvePromise = require('./recursivPullResolvePromise');
  technicalComponentDirectory.initialise(router,app, recursivPullResolvePromise);


  router.get('/technicalComponent/', function(req, res) {

    res.json(technicalComponentDirectory.buildDictionnaryArray());
  });//<= get_technicalComponent

  router.get('/technicalComponent/componentsCategoriesTree', function (req, res,next) {
    res.json(componentsCategoriesTree);
  });

}
