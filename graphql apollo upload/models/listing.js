const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  images: [
    {
      type: String,
      require: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Listing", listingSchema);
