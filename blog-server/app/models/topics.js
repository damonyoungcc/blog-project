const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const topicsSchema = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true, select: false },
    poster: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
  },
  { timestamps: true },
);

module.exports = model('User', topicsSchema);
