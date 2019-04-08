'use strict';
var viewProductMgr  = require('./view-product/viewProductMgr');


module.exports = function(app) {

    app.route('/viewproducts')
    .get(viewProductMgr.viewAllProducts);   // view all products

    app.route('/viewproduct/:subcategoryid')
    .get(viewProductMgr.viewProducts);

    app.route('/singleproduct/:productId')
    .get(viewProductMgr.viewSingleProducts);

    app.route('/productSettings')
    .get(viewProductMgr.getProductSettings);


    app.route('/categoryColor/:id')
    .put(viewProductMgr.filterByColor);
   
}