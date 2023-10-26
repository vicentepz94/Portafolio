const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProyectSchema = mongoose.Schema({
  title: String,
  description: String,
  technology: String,
  content: String,
  miniature: String,
  difficulty: Number,
  path: {
    type: String,
    unique: true,
  },
  tag: String,
  created_at: Date,
});

ProyectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Proyect", ProyectSchema);
