'use strict';
var SuperCategory = require('../../model/superCategory.model');


exports.getMainCategory = function (req, res) {
  SuperCategory.findById(req.params.id, function (err, category) {
    if (err) {
      res.status(500).send({
        "result": 0
      });
    } else {
      var categoryLength = category.mainCategory.length - 1;
      for (var i = 0; i <= categoryLength; i++) {
        category.mainCategory[i].mainCategoryImageName = appSetting.categoryServerPath + category.mainCategory[i].mainCategoryName + '/' + category.mainCategory[i].mainCategoryImageName;
      }
      res.status(200).json(category);
    }
  });
}


