const mongoose = require("mongoose");

const chienSchema = new mongoose.Schema(
  {
    refuge: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    puce: {
      type: String,
    },
    robe: { type: String },

    sexe: {
      type: String,
    },
    chat: {
      type: String,
    },
    sante: {
      type: String,
    },
    age: {
      type: Number,
    },
    emplacement: {
      type: String,
    },
    description: {
      type: String,
    },
    statut: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ChienModel = mongoose.model("chien", chienSchema);
module.exports = ChienModel;
