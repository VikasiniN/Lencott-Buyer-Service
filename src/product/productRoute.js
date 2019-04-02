'use strict';
var viewProductMgr  = require('./view-product/viewProductMgr');


module.exports = function(app) {
    app.route('/viewproduct/:subcategoryid')
    .get(viewProductMgr.viewProducts);

    app.route('/singleproduct/:productId')
    .get(viewProductMgr.viewSingleProducts);
   
}