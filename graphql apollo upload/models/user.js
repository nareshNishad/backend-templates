const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdlisting: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
