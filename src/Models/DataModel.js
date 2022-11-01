const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    number: { type: String },
    title: { type: String },
    price: { type: String },
    description: { type: String },
    category: { type: String },
    image: { type: String },
  },
  { versionKey: false }
);

const DataModel = mongoose.model("datamodels", DataSchema);
module.exports = DataModel;
