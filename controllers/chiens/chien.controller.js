const ChienModel = require("../../models/chien.model");
const fs = require("fs"); //natif express ou node

//Création chien
module.exports.newChien = (req, res, next) => {
  const chienObject = req.body;
  const chien = new ChienModel({
    ...chienObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  //enregistrement en base
  chien
    .save()
    .then(() => {
      res.status(201).json({ message: "Post saved successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
//get 1 produit
module.exports.getChien = (req, res) => {
  //console.log("coucou");
  //console.log(req.params.id);
  ChienModel.findOne({ _id: req.params.id }, (err, docs) => {
    res.send(docs);
  });
};
//tous les produits
module.exports.getAllChiens = async (req, res) => {
  const chiens = await ChienModel.find();
  /*produits.push(products);*/

  res.status(200).json(chiens);
};

//update 1 produit
exports.updateOneChien = (req, res, next) => {
  const chienObject = req.file
    ? {
        ...JSON.parse(req.body.chien),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  ChienModel.updateOne(
    { _id: req.params.id },
    { ...chienObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
/*module.exports.updateOneChien = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  } else {
    await ChienModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          age: req.body.age,
          chat: req.body.chat,
          robe: req.body.robe,
          emplacement: req.body.emplacement,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          res.status(400).json({ err: "erreur!!" });
        }
      }
    );
  }
};*/
//delete 1 chien

exports.deleteOneChien = (req, res, next) => {
  ChienModel.findOne({ _id: req.params.id })
    .then((chien) => {
      const filename = chien.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        ChienModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
