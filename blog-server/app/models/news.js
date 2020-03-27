const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const newsSchema = new Schema(
  {
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    content: { type: String, required: true, select: false },
    origin: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: false },
    newsType: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
  },
  { timestamps: true },
);

module.exports = model('News', newsSchema);
