var viewProductDA = require('./viewProductDA');

exports.viewProducts = function (req, res) {
    try {
        viewProductDA.viewProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.viewSingleProducts = function (req, res) {
    try {
        viewProductDA.viewSingleProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}
exports.viewAllProducts = function (req, res) {
    try {
        viewProductDA.viewAllProducts(req, res);
    } catch (error) {
        console.log(error);
    }
}


exports.getProductSettings = function (req, res) {
    try {
        viewProductDA.getProductSettings(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.filterByColor = function (req, res) {
    try {
        viewProductDA.filterByColor(req, res);
    } catch (error) {
        console.log(error);
    }
}



