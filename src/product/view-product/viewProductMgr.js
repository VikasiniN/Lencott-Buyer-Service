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

