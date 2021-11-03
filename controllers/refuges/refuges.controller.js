const ChienModel = require("../../models/chien.model");

//toutes les catégories
module.exports.getAllRefuges = (req, res) => {
  //console.log("coucou");
  try {
    ChienModel.find().distinct("refuge", function (error, refuges) {
      // categories is an array of all ObjectIds

      res.status(200).json(refuges);
    });
  } catch (err) {
    res.status(200).json({ err: "oupssssssss!!!!!" });
  }
};

//getAllProducts of One Categorie
module.exports.getAllRefugeChien = (req, res) => {
  ChienModel.find({ refuge: req.params.refuge }, (err, docs) => {
    res.send(docs);
  });
};
//delete one categorie
module.exports.deleteOneChienRefuge = async (req, res) => {
  try {
    await ChienModel.deleteMany({ refuge: req.params.refuge }).exec();
    return res.status(200).json({ message: "Refuge successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//updateOneCategorie (name)
module.exports.updateOneRefuge = async (req, res) => {
  ChienModel.updateMany(
    { refuge: req.params.refuge },
    {
      $set: { refuge: req.body.refuge },
    },
    { new: false, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.status(400).json({ err });
      }
    }
  );
};
