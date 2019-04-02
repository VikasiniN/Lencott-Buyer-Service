var settingRoutes = require('./settings/settingsRoute');
var productRoutes = require('./product/productRoute');
var categoryRoutes = require('./category/categoryRoute');

exports.loadRoutes = function (app) {
    settingRoutes(app);
    productRoutes(app);
    categoryRoutes(app);
};

