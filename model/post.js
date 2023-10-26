const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  active: Boolean,
  miniature: String,
  tag: String,
  path: {
    type: String,
    unique: true,
  },
  created_at: Date,
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
