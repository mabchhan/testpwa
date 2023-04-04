const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  message: {
    type: String,
    required: false,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  pet: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Donation = model("Donation", donationSchema);

module.exports = Donation;
