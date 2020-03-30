const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const topicsSchema = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    poster: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

module.exports = model('Topics', topicsSchema);
