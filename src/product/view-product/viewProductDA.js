var Product = require('../../model/product.model');
var appSetting = require('../../config/appSetting');
var ProductSettings = require('../../model/productDetails.model');

exports.viewProducts = function (req, res) {
    Product.find({
        'subCategory': req.params.subcategoryid

    }, function (err, product) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving products."
            });
        } else {
            var productLength = product.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = product[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    product[i].productImageName[j] = appSetting.productServerPath + product[i].styleCode + '/' + product[i].productImageName[j];
                }
            }
            res.status(200).json(product);
        }
    })
}


exports.viewSingleProducts = function (req, res) {
    Product.findById(req.params.productId

        ,
        function (err, product) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving products."
                });
            } else {

                var productImages = product.productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    product.productImageName[j] = appSetting.productServerPath + product.styleCode + '/' + product.productImageName[j];

                }
                res.status(200).json(product);
            }
        })
}

exports.viewAllProducts = function (req, res) {
    Product.find({}, function (err, product) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving products."
            });
        } else {
            var productLength = product.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = product[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    product[i].productImageName[j] = appSetting.productServerPath + product[i].styleCode + '/' + product[i].productImageName[j];
                }
            }
            res.status(200).json(product);
        }
    })
}


exports.getProductSettings = function (req, res) {
    ProductSettings.find({}).select().exec(function (err, productdetails) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            res.status(200).json(productdetails);
        }
    });
}

exports.filterByColor = function (req, res) {
    if (req.body.colorFilter !== undefined && (req.body.occasionFilter === null || req.body.occasionFilter === undefined) &&
        (req.body.materialFilter === null || req.body.materialFilter === undefined) &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined))) { // filter only color
        Product.find({
            /*  mainCategory: req.params.id, */
            color: req.body.colorFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.colorFilter === null || req.body.colorFilter === undefined) &&
        (req.body.materialFilter !== null) && (req.body.occasionFilter === null || req.body.occasionFilter === undefined) &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined))) { // filter only for material
        Product.find({
            /* mainCategory: req.params.id, */
            material: req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.minimumPriceFilter !== undefined && req.body.minimumPriceFilter !== undefined) &&
        (req.body.materialFilter === null || req.body.materialFilter === undefined) &&
        (req.body.colorFilter === null || req.body.colorFilter === undefined) && (req.body.occasionFilter === null || req.body.occasionFilter === undefined)) {
        // filter only price
        Product.find({
            /* mainCategory: req.params.id, */
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            }
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.colorFilter === null || req.body.colorFilter === undefined) &&
        (req.body.occasionFilter !== null) &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined)) && (req.body.materialFilter === null || req.body.materialFilter === undefined)) { // filter only for occasion
        Product.find({
            /* mainCategory: req.params.id, */
            occassion: req.body.occasionFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.colorFilter !== null && req.body.materialFilter !== null &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined) && (req.body.occasionFilter === null || req.body.occasionFilter === undefined))
    ) { // filter for color and material
        Product.find({
            /*  mainCategory: req.params.id, */
            color: req.body.colorFilter,
            material: req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.colorFilter !== null && req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null &&
        (req.body.materialFilter === null || req.body.materialFilter === undefined) && (req.body.occasionFilter === null || req.body.occasionFilter === undefined)) {
        // filter for color and price
        Product.find({
            /*    mainCategory: req.params.id, */
            color: req.body.colorFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            }
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.materialFilter !== null && req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null &&
        (req.body.colorFilter === null || req.body.colorFilter === undefined) && (req.body.occasionFilter === null || req.body.occasionFilter === undefined)) {
        // filter for material and price
        Product.find({
            /*   mainCategory: req.params.id, */
            material: req.body.materialFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            }
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.colorFilter !== null && req.body.occasionFilter !== null &&
        (req.body.materialFilter === null || req.body.materialFilter === undefined) && ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined))) {
        // filter for color and occassion
        Product.find({
            /*   mainCategory: req.params.id, */
            color: req.body.colorFilter,
            occassion: req.body.occasionFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.occasionFilter !== null && req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null &&
        (req.body.colorFilter === null || req.body.colorFilter === undefined) && (req.body.materialFilter === null || req.body.materialFilter === undefined)) {
        // filter for occasion and price
        Product.find({
            /*   mainCategory: req.params.id, */
            occassion: req.body.occasionFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            }
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.occasionFilter !== null && req.body.materialFilter !== null &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined) && (req.body.colorFilter === null || req.body.colorFilter === undefined))
    ) { // filter for occasion and material
        Product.find({
            /*  mainCategory: req.params.id, */
            occassion: req.body.occasionFilter,
            material: req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if (req.body.colorFilter != null && req.body.materialFilter !== null &&
        req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null && (req.body.occasionFilter === null || req.body.occasionFilter === undefined)) {
        // filter for price, color and material
        Product.find({
            /*   mainCategory: req.params.id, */
            color: req.body.colorFilter,
            material: req.body.materialFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            }
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.colorFilter !== null && req.body.materialFilter !== null && req.body.occasionFilter !== null) &&
        ((req.body.minimumPriceFilter === null || req.body.minimumPriceFilter === undefined) ||
            (req.body.maximumPriceFilter === null || req.body.maximumPriceFilter === undefined))
    ) { // filter for color occasion and material
        Product.find({
            /*  mainCategory: req.params.id, */
            occassion: req.body.occasionFilter,
            color: req.body.colorFilter,
            material: req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null) && req.body.materialFilter !== null && req.body.occasionFilter !== null &&
        (
            (req.body.colorFilter === null || req.body.colorFilter === undefined))
    ) { // filter for price occasion and material
        Product.find({
            /*  mainCategory: req.params.id, */
            occassion: req.body.occasionFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            },
            material: req.body.materialFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null) && req.body.colorFilter !== null && req.body.occasionFilter !== null &&
        (
            (req.body.materialFilter === null || req.body.materialFilter === undefined))
    ) { // filter for price occasion and color
        Product.find({
            /*  mainCategory: req.params.id, */
            occassion: req.body.occasionFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            },
            color: req.body.colorFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    } else if ((req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null) && req.body.colorFilter !== null && req.body.occasionFilter !== null &&
    (
        (req.body.materialFilter !== null || req.body.materialFilter !== undefined))
) { // filter for price occasion material and color
    Product.find({
        /*  mainCategory: req.params.id, */
        occassion: req.body.occasionFilter,
        material: req.body.materialFilter,
        sp: {
            "$gte": req.body.minimumPriceFilter,
            "$lte": req.body.maximumPriceFilter
        },
        color: req.body.colorFilter
    }).select().
    exec(function (err, productModel) {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving notes."
            });
        } else {
            var productLength = productModel.length - 1;
            for (var i = 0; i <= productLength; i++) {
                var productImages = productModel[i].productImageName.sort();
                var productImageLength = productImages.length - 1;
                for (var j = 0; j <= productImageLength; j++) {
                    productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                }
            }
            res.json(productModel);
        }
    });
}else if ((req.body.minimumPriceFilter !== null && req.body.maximumPriceFilter !== null) && req.body.colorFilter !== null && req.body.occasionFilter !== null &&
        (
            (req.body.materialFilter === null || req.body.materialFilter === undefined))
    ) { // filter for price material and color
        Product.find({
            /*  mainCategory: req.params.id, */
            material: req.body.materialFilter,
            sp: {
                "$gte": req.body.minimumPriceFilter,
                "$lte": req.body.maximumPriceFilter
            },
            color: req.body.colorFilter
        }).select().
        exec(function (err, productModel) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while retrieving notes."
                });
            } else {
                var productLength = productModel.length - 1;
                for (var i = 0; i <= productLength; i++) {
                    var productImages = productModel[i].productImageName.sort();
                    var productImageLength = productImages.length - 1;
                    for (var j = 0; j <= productImageLength; j++) {
                        productModel[i].productImageName[j] = appSetting.productServerPath + productModel[i].styleCode + '/' + productModel[i].productImageName[j];
                    }
                }
                res.json(productModel);
            }
        });
    }



}
