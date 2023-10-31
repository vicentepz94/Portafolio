const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProjectSchema = mongoose.Schema({
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

ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Project", ProjectSchema);
